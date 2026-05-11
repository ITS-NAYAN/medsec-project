# routes/eligibility_routes.py
# Defines the FastAPI API routes for the MedSec Eligibility AI system.
# This file wires together: input validation → eligibility check → ranking → response.

import json
import os
from typing import List

from fastapi import APIRouter, HTTPException, status

# ✅ FIXED IMPORTS
from app.ai.models.patient_model import PatientInput

from app.ai.models.response_model import (
    EligibilityResponse,
    SchemeResult,
    ErrorResponse,
)

from app.ai.engines.eligibility_engine import check_eligibility

from app.ai.engines.ranking_engine import rank_schemes

from app.ai.engines.response_generator import generate_chatbot_response


# ---- Router Setup ----
router = APIRouter(
    prefix="/api/v1",
    tags=["Eligibility"],
)

# ---- Path to schemes data file ----
SCHEMES_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "data",
    "schemes.json"
)


def load_schemes() -> List[dict]:
    """
    Load scheme definitions from JSON file.
    """

    try:
        with open(SCHEMES_FILE, "r", encoding="utf-8") as f:
            schemes = json.load(f)

        if not isinstance(schemes, list) or len(schemes) == 0:
            raise ValueError(
                "Schemes file must contain a non-empty list."
            )

        return schemes

    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Schemes database file not found. "
                "Please check data/schemes.json."
            ),
        )

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Schemes database is malformed JSON: {str(e)}",
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ---------------------------------------------------------
# POST /check-eligibility
# ---------------------------------------------------------

@router.post(
    "/check-eligibility",
    response_model=EligibilityResponse,
    status_code=status.HTTP_200_OK,
    summary="Check patient eligibility for healthcare schemes",
    description=(
        "Submit patient health details and receive ranked "
        "government healthcare schemes."
    ),
    responses={
        200: {"description": "Eligibility results returned successfully"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"},
    },
)

async def check_patient_eligibility(
    patient: PatientInput
) -> EligibilityResponse:

    # Step 1 → Load schemes
    all_schemes = load_schemes()

    # Step 2 → Check eligibility
    eligible_schemes, rejected_schemes = check_eligibility(
        patient,
        all_schemes
    )

    # Step 3 → Rank schemes
    ranked = rank_schemes(
        eligible_schemes,
        patient
    )

    # Step 4 → Generate chatbot response
    chatbot_response = generate_chatbot_response(
        patient,
        ranked
    )

    # Step 5 → Build response list
    scheme_results: List[SchemeResult] = []

    for s in ranked:

        scheme_results.append(
            SchemeResult(
                scheme_name=s["scheme_name"],
                description=s["description"],
                benefit_level=s["benefit_level"],
                total_score=s["total_score"],
                matching_reasons=s.get(
                    "matching_reasons",
                    []
                ),
                required_documents=s.get(
                    "required_documents",
                    []
                ),
                hospital_support=s.get(
                    "hospital_support",
                    False
                ),
                emergency_support=s.get(
                    "emergency_support",
                    False
                ),
                supported_states=s.get(
                    "supported_states",
                    []
                ),
            )
        )

    # Step 6 → Ineligible summary
    ineligible_msg = None

    if not scheme_results:

        ineligible_msg = (
            f"No eligible schemes found for "
            f"{patient.name}. "
            f"Please review income, disease, "
            f"state, or BPL status."
        )

    # Step 7 → Final response
    return EligibilityResponse(
        patient_name=patient.name,
        total_eligible_schemes=len(scheme_results),
        chatbot_response=chatbot_response,
        ranked_schemes=scheme_results,
        ineligible_summary=ineligible_msg,
    )


# ---------------------------------------------------------
# GET /schemes
# ---------------------------------------------------------

@router.get(
    "/schemes",
    status_code=status.HTTP_200_OK,
    summary="List all available healthcare schemes",
)

async def list_all_schemes():

    schemes = load_schemes()

    return {
        "total_schemes": len(schemes),
        "schemes": [
            {
                "scheme_name": s["scheme_name"],
                "description": s["description"],
                "max_income": s["max_income"],
                "supported_states": s["supported_states"],
                "diseases_covered": s["diseases_covered"],
            }
            for s in schemes
        ],
    }


# ---------------------------------------------------------
# GET /health
# ---------------------------------------------------------

@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Health check",
)

async def health_check():

    schemes = load_schemes()

    return {
        "status": "healthy",
        "service": "MedSec Eligibility AI",
        "version": "1.0.0",
        "schemes_loaded": len(schemes),
    }
