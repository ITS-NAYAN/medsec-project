# utils/scoring_utils.py
# Utility functions used by the eligibility and ranking engines.
# These are small, focused helper functions — easy to test and reuse.

from typing import List


def normalize_text(text: str) -> str:
    """
    Convert text to lowercase and strip whitespace.
    Used for case-insensitive string matching.
    """
    return text.strip().lower()


def disease_matches(patient_disease: str, covered_diseases: List[str]) -> bool:
    """
    Check if the patient's disease matches any disease covered by a scheme.

    Uses partial matching — e.g., "chronic kidney disease" will match
    schemes that list "kidney disease" as a covered condition.

    Args:
        patient_disease: The disease the patient has (already normalized).
        covered_diseases: List of diseases covered by a scheme.

    Returns:
        True if any covered disease is a substring of the patient disease,
        or the patient disease is a substring of a covered disease.
    """
    patient_disease_norm = normalize_text(patient_disease)

    for covered in covered_diseases:
        covered_norm = normalize_text(covered)
        # Match if either is a substring of the other (bidirectional partial match)
        if covered_norm in patient_disease_norm or patient_disease_norm in covered_norm:
            return True

    return False


def state_is_supported(patient_state: str, supported_states: List[str]) -> bool:
    """
    Check if the patient's state is supported by the scheme.

    If the scheme's supported_states list contains "All",
    the scheme is valid for every Indian state.

    Args:
        patient_state: The state where the patient resides (title-cased).
        supported_states: States listed in the scheme.

    Returns:
        True if the scheme supports the patient's state.
    """
    # Normalize for comparison
    supported_normalized = [normalize_text(s) for s in supported_states]
    patient_normalized = normalize_text(patient_state)

    # "All" means the scheme is national (available in every state)
    if "all" in supported_normalized:
        return True

    return patient_normalized in supported_normalized


def get_benefit_level(score: int) -> str:
    """
    Translate a numeric score into a human-readable benefit level.

    Thresholds:
        80+  → High
        50+  → Medium
        <50  → Low

    Args:
        score: Total ranking score calculated for the scheme.

    Returns:
        "High", "Medium", or "Low" as a string label.
    """
    if score >= 80:
        return "High"
    elif score >= 50:
        return "Medium"
    else:
        return "Low"


def income_is_eligible(patient_income: int, scheme_max_income: int) -> bool:
    """
    Check if the patient's annual income is within the scheme's limit.

    Args:
        patient_income: Patient's annual household income in INR.
        scheme_max_income: Maximum income allowed by the scheme.

    Returns:
        True if the patient's income is at or below the limit.
    """
    return patient_income <= scheme_max_income


def age_is_eligible(patient_age: int, min_age: int, max_age: int) -> bool:
    """
    Check if the patient's age falls within the scheme's allowed range.

    Args:
        patient_age: The patient's age in years.
        min_age: Minimum age requirement of the scheme.
        max_age: Maximum age allowed by the scheme.

    Returns:
        True if the patient's age is within [min_age, max_age].
    """
    return min_age <= patient_age <= max_age


def gender_is_eligible(patient_gender: str, scheme_gender: str) -> bool:
    """
    Check if the patient's gender meets the scheme's gender requirement.

    Schemes with "any" gender requirement accept all genders.

    Args:
        patient_gender: The patient's gender (normalized to lowercase).
        scheme_gender: The scheme's gender requirement ("any", "male", "female").

    Returns:
        True if the patient meets the gender requirement.
    """
    if normalize_text(scheme_gender) == "any":
        return True
    return normalize_text(patient_gender) == normalize_text(scheme_gender)
