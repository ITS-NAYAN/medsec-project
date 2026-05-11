from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.models.access import RecordAccess
from app.models.record import Record
from app.models.patient import Patient
from app.models.clinic import Clinic
from app.models.user import User
from app.core.dependencies import require_role

router = APIRouter(prefix="/access", tags=["access"])


# ================= REQUEST ACCESS =================
@router.post("/request")
def request_access(
    record_id: int,
    to_clinic_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["doctor", "admin"]))
):
    record = db.query(Record).filter(
        Record.id == record_id
    ).first()

    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    patient = db.query(Patient).filter(
        Patient.id == record.patient_id
    ).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    access = RecordAccess(
        record_id=record_id,
        from_clinic_id=patient.clinic_id,
        to_clinic_id=to_clinic_id,
        requested_by=current_user["user_id"],
        status="pending"
    )

    db.add(access)
    db.commit()

    return {"message": "Request sent"}


# ================= APPROVE ACCESS (ORG LEVEL) =================
@router.post("/approve/{access_id}")
def approve_access(
    access_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    access = db.query(RecordAccess).filter(
        RecordAccess.id == access_id
    ).first()

    if not access:
        raise HTTPException(status_code=404, detail="Request not found")

    # ✅ Allow if same organization
    clinic = db.query(Clinic).filter(
        Clinic.id == access.to_clinic_id
    ).first()

    if not clinic or clinic.organization_id != current_user["organization_id"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    access.status = "approved"
    db.commit()

    return {"message": "Access approved"}


# ================= REJECT ACCESS (ORG LEVEL) =================
@router.post("/reject/{access_id}")
def reject_access(
    access_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    access = db.query(RecordAccess).filter(
        RecordAccess.id == access_id
    ).first()

    if not access:
        raise HTTPException(status_code=404, detail="Request not found")

    # ✅ Same org validation
    clinic = db.query(Clinic).filter(
        Clinic.id == access.to_clinic_id
    ).first()

    if not clinic or clinic.organization_id != current_user["organization_id"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    access.status = "rejected"
    db.commit()

    return {"message": "Access rejected"}


# ================= GET ACCESS REQUESTS (ORG LEVEL + JOIN DATA) =================
@router.get("/")
def get_access_requests(
    status: str = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    org_id = current_user["organization_id"]

    # 1. Get all clinics under this organization
    clinics = db.query(Clinic).filter(
        Clinic.organization_id == org_id
    ).all()

    clinic_ids = [c.id for c in clinics]

    # 2. Get ALL related requests (incoming + outgoing)
    query = db.query(RecordAccess).filter(
        or_(
            RecordAccess.from_clinic_id.in_(clinic_ids),
            RecordAccess.to_clinic_id.in_(clinic_ids)
        )
    )

    if status:
        query = query.filter(RecordAccess.status == status)

    requests = query.all()

    # 🔥 ENRICHED RESPONSE
    result = []

    for r in requests:

        record = db.query(Record).filter(
            Record.id == r.record_id
        ).first()

        patient = db.query(Patient).filter(
            Patient.id == record.patient_id
        ).first() if record else None

        clinic = db.query(Clinic).filter(
            Clinic.id == r.to_clinic_id
        ).first()

        user = db.query(User).filter(
            User.id == r.requested_by
        ).first()

        result.append({
            "id": r.id,
            "record_title": record.title if record else "Unknown",
            "patient_name": patient.name if patient else "Unknown",
            "clinic_name": clinic.name if clinic else "Unknown",
            "requested_by": user.email if user else "Unknown",
            "status": r.status,
            "created_at": r.created_at
        })

    return result