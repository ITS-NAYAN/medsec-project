

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.patient import Patient
from app.models.record import Record


router = APIRouter()


# ================= DATABASE =================
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ================= AI CHAT =================
@router.post("/chat")
async def ai_chat(
    data: dict,
    db: Session = Depends(get_db)
):

    message = data.get("message", "").lower()

    # 🔥 PATIENT QUERY
    if "patient" in message:

        total_patients = db.query(Patient).count()

        return {
            "response": (
                f"There are currently "
                f"{total_patients} patients "
                f"in the system."
            )
        }

    # 🔥 RECORD QUERY
    elif "record" in message:

        total_records = db.query(Record).count()

        return {
            "response": (
                f"There are currently "
                f"{total_records} uploaded "
                f"medical records."
            )
        }

    # 🔥 UPLOAD HELP
    elif "upload" in message:

        return {
            "response": (
                "Go to Upload Records page "
                "to upload medical files."
            )
        }

    # 🔥 DEFAULT RESPONSE
    return {
        "response": (
            "I can help with patients, "
            "records, and uploads."
        )
    }