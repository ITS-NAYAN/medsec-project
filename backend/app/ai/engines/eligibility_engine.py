from typing import List, Dict, Tuple
from app.ai.models.patient_model import PatientInput
from app.ai.utils.scoring_utils import (
    disease_matches,
    state_is_supported,
    income_is_eligible,
    age_is_eligible,
    gender_is_eligible,
)


def check_eligibility(
    patient: PatientInput,
    schemes: List[Dict],
) -> Tuple[List[Dict], List[Dict]]:
    """
    Main eligibility checker.

    Loops through all schemes and determines if the patient qualifies
    for each one. Returns two lists:
    - eligible_schemes: schemes the patient qualifies for (with reasons)
    - rejected_schemes: schemes the patient doesn't qualify for (with reasons)

    Args:
        patient: The validated PatientInput object.
        schemes: List of scheme dictionaries loaded from schemes.json.

    Returns:
        A tuple of (eligible_schemes, rejected_schemes).
    """
    eligible_schemes = []
    rejected_schemes = []

    for scheme in schemes:
        # Run all eligibility checks for this scheme
        is_eligible, matching_reasons, rejection_reasons = _evaluate_scheme(patient, scheme)

        if is_eligible:
            # Add the matching reasons to the scheme dict before returning
            scheme_copy = dict(scheme)  # Don't mutate the original
            scheme_copy["matching_reasons"] = matching_reasons
            eligible_schemes.append(scheme_copy)
        else:
            scheme_copy = dict(scheme)
            scheme_copy["rejection_reasons"] = rejection_reasons
            rejected_schemes.append(scheme_copy)

    return eligible_schemes, rejected_schemes


def _evaluate_scheme(
    patient: PatientInput,
    scheme: Dict,
) -> Tuple[bool, List[str], List[str]]:
    """
    Evaluates a single scheme against the patient profile.

    Each check either adds to matching_reasons (if passed) or
    rejection_reasons (if failed). A scheme is eligible only if
    ALL hard checks pass.

    Hard checks (must ALL pass to be eligible):
        - Age range
        - Income limit
        - Disease coverage
        - State support
        - Gender requirement
        - BPL requirement

    Soft checks (bonus matching reasons, never disqualify):
        - Senior citizen support
        - Disability support
        - Pregnancy support

    Args:
        patient: The patient profile.
        scheme: A single scheme dictionary.

    Returns:
        Tuple of (is_eligible, matching_reasons, rejection_reasons)
    """
    matching_reasons: List[str] = []
    rejection_reasons: List[str] = []

    # ---- Hard Check 1: Age Eligibility ----
    if age_is_eligible(patient.age, scheme["min_age"], scheme["max_age"]):
        matching_reasons.append(
            f"Age {patient.age} is within the eligible range ({scheme['min_age']}–{scheme['max_age']} years)"
        )
    else:
        rejection_reasons.append(
            f"Age {patient.age} is outside the eligible range ({scheme['min_age']}–{scheme['max_age']} years)"
        )
        # Early exit — age is a hard disqualifier
        return False, matching_reasons, rejection_reasons

    # ---- Hard Check 2: Income Eligibility ----
    if income_is_eligible(patient.annual_income, scheme["max_income"]):
        matching_reasons.append(
            f"Annual income ₹{patient.annual_income:,} is within the limit (≤ ₹{scheme['max_income']:,})"
        )
    else:
        rejection_reasons.append(
            f"Annual income ₹{patient.annual_income:,} exceeds the scheme limit of ₹{scheme['max_income']:,}"
        )
        return False, matching_reasons, rejection_reasons

    # ---- Hard Check 3: Disease Coverage ----
    if disease_matches(patient.disease, scheme["diseases_covered"]):
        matching_reasons.append(
            f"Your condition '{patient.disease}' is covered under this scheme"
        )
    else:
        rejection_reasons.append(
            f"Your condition '{patient.disease}' is not listed under this scheme's covered diseases"
        )
        return False, matching_reasons, rejection_reasons

    # ---- Hard Check 4: State Support ----
    if state_is_supported(patient.state, scheme["supported_states"]):
        if "All" in scheme["supported_states"] or "all" in [s.lower() for s in scheme["supported_states"]]:
            matching_reasons.append(
                f"This is a national scheme available in all states including {patient.state}"
            )
        else:
            matching_reasons.append(
                f"Your state {patient.state} is specifically supported by this scheme"
            )
    else:
        rejection_reasons.append(
            f"This scheme is not available in {patient.state} (only in: {', '.join(scheme['supported_states'])})"
        )
        return False, matching_reasons, rejection_reasons

    # ---- Hard Check 5: Gender Requirement ----
    if gender_is_eligible(patient.gender, scheme["gender_requirement"]):
        if scheme["gender_requirement"].lower() != "any":
            matching_reasons.append(
                f"This scheme is specifically available for {scheme['gender_requirement']} patients"
            )
    else:
        rejection_reasons.append(
            f"This scheme is only for {scheme['gender_requirement']} patients"
        )
        return False, matching_reasons, rejection_reasons

    # ---- Hard Check 6: BPL Requirement ----
    if scheme["bpl_required"] and not patient.bpl:
        rejection_reasons.append(
            "This scheme requires a Below Poverty Line (BPL) card which the patient does not hold"
        )
        return False, matching_reasons, rejection_reasons
    elif scheme["bpl_required"] and patient.bpl:
        matching_reasons.append(
            "Patient holds BPL status as required by this scheme"
        )

    # ---- Soft Check: Senior Citizen Support ----
    # Automatically determine senior citizen from age
    if patient.age >= 60 and scheme["senior_citizen_support"]:
        matching_reasons.append(
            "Senior citizen support is available under this scheme"
        )

    # ---- Soft Check: Disability Support ----
    if patient.disability and scheme["disability_support"]:
        matching_reasons.append(
            "Disability healthcare support is provided under this scheme"
        )

    # ---- Soft Check: Pregnancy Support ----
    if patient.pregnant and scheme["pregnancy_support"]:
        matching_reasons.append(
            "Pregnancy and maternity care is covered under this scheme"
        )

    # ---- Soft Check: Emergency Support ----
    if scheme["emergency_support"]:
        matching_reasons.append(
            "Emergency medical coverage is included"
        )

    # ---- Soft Check: Hospital Network ----
    if scheme["hospital_support"]:
        matching_reasons.append(
            "Treatment available at empanelled hospitals"
        )

    # All hard checks passed — scheme is eligible
    return True, matching_reasons, rejection_reasons