from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os

from app.database import SessionLocal
from app.models.record import Record
from app.models.patient import Patient
from app.models.access import RecordAccess
from app.core.dependencies import require_role

# ✅ NEW IMPORT
from app.s3 import upload_file

router = APIRouter(prefix="/records", tags=["Records"])

UPLOAD_DIR = "uploads"


# ================= DATABASE =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= CREATE RECORD =================
@router.post("/", dependencies=[Depends(require_role(["doctor"]))])
def create_record(
    patient_id: int = Form(...),
    title: str = Form(...),
    record_type: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_role(["doctor"]))
):
    # ✅ Ensure patient belongs to same clinic
    patient = db.query(Patient).filter(
        Patient.id == patient_id,
        Patient.clinic_id == current_user["clinic_id"]
    ).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # ✅ Upload file to S3
    file_url = upload_file(file.file, file.filename)

    # ✅ Create record
    new_record = Record(
        patient_id=patient_id,
        doctor_id=current_user["user_id"],
        title=title,
        record_type=record_type,
        description=description,
        file_path=file_url,  # 🔥 now stores S3 URL
        hash="temp_hash"
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return {
        "message": "Record uploaded successfully",
        "file_url": file_url
    }


# ================= GET RECORDS =================
@router.get("/")
def get_records(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "doctor", "staff"]))
):
    clinic_id = current_user["clinic_id"]

    # 🔹 Own clinic records
    own_records = db.query(Record).join(Patient).filter(
        Patient.clinic_id == clinic_id
    ).all()

    # 🔹 Shared records
    access_entries = db.query(RecordAccess).filter(
        RecordAccess.to_clinic_id == clinic_id,
        RecordAccess.status == "approved"
    ).all()

    shared_record_ids = [a.record_id for a in access_entries]

    shared_records = []
    if shared_record_ids:
        shared_records = db.query(Record).filter(
            Record.id.in_(shared_record_ids)
        ).all()

    # 🔹 Merge (avoid duplicates)
    all_records = {r.id: r for r in own_records}

    for r in shared_records:
        all_records[r.id] = r

    return list(all_records.values())


# ================= GET SHARED RECORDS =================
@router.get("/shared")
def get_shared_records(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "doctor", "staff"]))
):
    clinic_id = current_user["clinic_id"]

    access_entries = db.query(RecordAccess).filter(
        RecordAccess.to_clinic_id == clinic_id,
        RecordAccess.status == "approved"
    ).all()

    record_ids = [a.record_id for a in access_entries]

    if not record_ids:
        return []

    records = db.query(Record).filter(
        Record.id.in_(record_ids)
    ).all()

    return records