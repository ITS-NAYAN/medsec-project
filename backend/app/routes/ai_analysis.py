"""
MedSec - AI Analysis Routes
Handles AI-powered medical report analysis
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.record import Record

from app.services.pdf_service import extract_text_from_pdf

from app.services.gemini_service import (
    summarize_medical_report,
    quick_chat
)

router = APIRouter()


# ===============================
# Analyze Uploaded Medical Report
# ===============================
@router.post("/analyze/{record_id}")
def analyze_report(
    record_id: int,
    db: Session = Depends(get_db)
):

    # Find uploaded record
    record = db.query(Record).filter(
        Record.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found"
        )

    # Extract text from uploaded PDF
    extracted_text = extract_text_from_pdf(
        record.file_path
    )

    if not extracted_text:
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from PDF"
        )

    # Generate AI Summary
    ai_summary = summarize_medical_report(
        extracted_text
    )

    return {
        "record_id": record.id,
        "summary": ai_summary
    }


# ===============================
# Simple AI Chat
# ===============================
@router.post("/chat")
def ai_chat(payload: dict):

    message = payload.get("message")

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message is required"
        )

    response = quick_chat(message)

    return {
        "response": response
    }