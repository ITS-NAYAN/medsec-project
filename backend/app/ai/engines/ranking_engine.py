# engines/ranking_engine.py
# The Ranking Engine scores each eligible scheme and sorts them
# from most beneficial to least beneficial for the patient.
#
# Scoring is based on how well a scheme matches the patient's specific
# needs and circumstances — not just whether they qualify.

from typing import List, Dict
from app.ai.models.patient_model import PatientInput
from app.ai.utils.scoring_utils import get_benefit_level, disease_matches


# ---- Scoring Weights ----
# These constants define how much each factor contributes to the total score.
# Adjust these weights to change priority of factors.

SCORE_DISEASE_MATCH        = 40   # Disease is directly covered → highest priority
SCORE_LOW_INCOME           = 25   # Patient income is well within limit
SCORE_STATE_SUPPORT        = 20   # Scheme specifically lists patient's state
SCORE_BPL_MATCH            = 15   # Patient is BPL and scheme supports BPL
SCORE_SENIOR_CITIZEN       = 10   # Scheme has senior citizen specific support
SCORE_EMERGENCY_SUPPORT    = 15   # Scheme covers emergencies
SCORE_DISABILITY_MATCH     = 12   # Disability support when patient has disability
SCORE_PREGNANCY_MATCH      = 12   # Pregnancy support when patient is pregnant


def rank_schemes(
    eligible_schemes: List[Dict],
    patient: PatientInput,
) -> List[Dict]:
    """
    Score each eligible scheme and sort from highest to lowest score.

    Each scheme gets a calculated total_score based on how well it
    matches the patient's specific needs. A base benefit_score from
    the scheme data is also factored in.

    Args:
        eligible_schemes: Schemes that passed all eligibility checks.
        patient: The patient profile used for scoring context.

    Returns:
        List of schemes sorted by total_score descending, with
        total_score and benefit_level added to each scheme dict.
    """
    scored_schemes = []

    for scheme in eligible_schemes:
        total_score = _calculate_score(scheme, patient)
        benefit_level = get_benefit_level(total_score)

        # Build a clean result dict with scoring info attached
        ranked_entry = {
            **scheme,  # Include all original scheme fields
            "total_score": total_score,
            "benefit_level": benefit_level,
        }
        scored_schemes.append(ranked_entry)

    # Sort by total_score descending — best scheme first
    scored_schemes.sort(key=lambda s: s["total_score"], reverse=True)

    return scored_schemes


def _calculate_score(scheme: Dict, patient: PatientInput) -> int:
    """
    Calculate the total relevance score for a single scheme.

    The score is built from:
    1. Base benefit_score from the scheme's own data (reflects scheme value)
    2. Contextual bonuses based on how well the scheme fits the patient

    Args:
        scheme: An eligible scheme dictionary.
        patient: The patient profile.

    Returns:
        An integer total score.
    """
    score = 0

    # ---- 1. Base scheme benefit score (from schemes.json) ----
    # This reflects the inherent value of the scheme (coverage amount, reach, etc.)
    # Normalize to a 0–20 range so it doesn't dominate the score
    base_bonus = min(int(scheme.get("benefit_score", 0) / 5), 20)
    score += base_bonus

    # ---- 2. Disease relevance ----
    # If the patient's disease directly matches, add the full disease bonus
    if disease_matches(patient.disease, scheme.get("diseases_covered", [])):
        score += SCORE_DISEASE_MATCH

    # ---- 3. State-specific support ----
    # Bonus if scheme specifically targets the patient's state (not just "All")
    supported = [s.lower() for s in scheme.get("supported_states", [])]
    if patient.state.lower() in supported:
        # Specifically listed state → full bonus
        score += SCORE_STATE_SUPPORT
    elif "all" in supported:
        # National scheme → partial bonus (still helpful, but not targeted)
        score += int(SCORE_STATE_SUPPORT * 0.5)

    # ---- 4. Income proximity bonus ----
    # More bonus if patient income is significantly below the scheme limit
    # (meaning the patient is well within the income bracket)
    max_income = scheme.get("max_income", 1)
    if max_income > 0:
        income_ratio = patient.annual_income / max_income
        if income_ratio <= 0.3:
            # Patient earns very little relative to the limit → full bonus
            score += SCORE_LOW_INCOME
        elif income_ratio <= 0.6:
            # Patient is in the lower-middle range → partial bonus
            score += int(SCORE_LOW_INCOME * 0.6)
        else:
            # Patient is near the limit → small bonus
            score += int(SCORE_LOW_INCOME * 0.2)

    # ---- 5. BPL match ----
    if patient.bpl and scheme.get("bpl_required", False):
        # Scheme requires BPL and patient has it → high relevance
        score += SCORE_BPL_MATCH
    elif patient.bpl and not scheme.get("bpl_required", False):
        # Scheme doesn't require BPL but patient is BPL → minor benefit
        score += int(SCORE_BPL_MATCH * 0.3)

    # ---- 6. Senior citizen support ----
    if patient.senior_citizen and scheme.get("senior_citizen_support", False):
        score += SCORE_SENIOR_CITIZEN

    # ---- 7. Emergency coverage ----
    if scheme.get("emergency_support", False):
        score += SCORE_EMERGENCY_SUPPORT

    # ---- 8. Disability support ----
    if patient.disability and scheme.get("disability_support", False):
        score += SCORE_DISABILITY_MATCH

    # ---- 9. Pregnancy support ----
    if patient.pregnant and scheme.get("pregnancy_support", False):
        score += SCORE_PREGNANCY_MATCH

    return score
