# backend/app/routes/patient.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import SessionLocal
from app.models.patient import Patient
from app.schemas.patient import PatientCreate
from app.core.dependencies import require_role

router = APIRouter(prefix="/patients", tags=["Patients"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= CREATE PATIENT =================
@router.post("/", dependencies=[Depends(require_role(["doctor"]))])
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role(["doctor"]))
):

    new_patient = Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        phone=patient.phone,
        clinic_id=current_user["clinic_id"],
        created_by=current_user["user_id"],
        last_visit=datetime.utcnow()
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient


# ================= GET PATIENTS =================
@router.get("/", dependencies=[Depends(require_role(["doctor", "staff"]))])
def get_patients(
    db: Session = Depends(get_db),
    current_user=Depends(require_role(["doctor", "staff"]))
):

    # 🔥 SAFE FILTER (CLINIC BASED)
    patients = db.query(Patient).filter(
        Patient.clinic_id == current_user["clinic_id"]
    ).all()

    return patients