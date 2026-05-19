from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.patient import Patient
from app.models.record import Record
from app.models.clinic import Clinic

from app.core.dependencies import require_role

router = APIRouter(
    prefix="/admin/stats",
    tags=["Admin Stats"]
)

@router.get("/")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):

    org_id = current_user["organization_id"]

    total_users = db.query(User).filter(
        User.organization_id == org_id
    ).count()

    total_doctors = db.query(User).filter(
        User.organization_id == org_id,
        User.role == "doctor"
    ).count()

    total_staff = db.query(User).filter(
        User.organization_id == org_id,
        User.role == "staff"
    ).count()

    total_admins = db.query(User).filter(
        User.organization_id == org_id,
        User.role == "admin"
    ).count()

    total_clinics = db.query(Clinic).filter(
        Clinic.organization_id == org_id
    ).count()

    total_patients = db.query(Patient).filter(
        Patient.organization_id == org_id
    ).count()

    total_records = db.query(Record).filter(
        Record.organization_id == org_id
    ).count()

    return {
        "total_users": total_users,
        "total_doctors": total_doctors,
        "total_staff": total_staff,
        "total_admins": total_admins,
        "total_clinics": total_clinics,
        "total_patients": total_patients,
        "total_records": total_records,
    }