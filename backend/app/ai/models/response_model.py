# models/response_model.py
# Defines the structured JSON response models for the API.
# These ensure consistent, typed API output every time.

from pydantic import BaseModel
from typing import List, Optional


class SchemeResult(BaseModel):
    """
    Represents a single eligible scheme with its evaluation results.
    """
    scheme_name: str
    description: str
    benefit_level: str                  # "High", "Medium", or "Low"
    total_score: int                    # Calculated ranking score
    matching_reasons: List[str]         # Why the patient qualifies
    required_documents: List[str]       # Documents needed to apply
    hospital_support: bool              # Whether hospital network is included
    emergency_support: bool             # Whether emergency coverage is included
    supported_states: List[str]         # States where scheme is valid


class EligibilityResponse(BaseModel):
    """
    The full API response returned to the client after eligibility check.
    """
    patient_name: str
    total_eligible_schemes: int
    chatbot_response: str               # Human-readable guidance message
    ranked_schemes: List[SchemeResult]  # Schemes sorted best-first
    ineligible_summary: Optional[str]   # Summary if no schemes found


class ErrorResponse(BaseModel):
    """
    Standard error response format for validation or processing errors.
    """
    error: str
    details: Optional[str] = None
