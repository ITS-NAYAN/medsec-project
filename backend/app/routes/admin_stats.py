from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.organization import Organization
from app.models.patient import Patient
from app.models.record import Record

router = APIRouter(
    prefix="/admin/stats",
    tags=["Admin Stats"]
)


@router.get("/")
def get_admin_stats(db: Session = Depends(get_db)):

    total_users = db.query(User).count()

    total_doctors = db.query(User).filter(
        User.role == "doctor"
    ).count()

    total_staff = db.query(User).filter(
        User.role == "staff"
    ).count()

    total_admins = db.query(User).filter(
        User.role == "admin"
    ).count()

    total_clinics = db.query(Organization).count()

    total_patients = db.query(Patient).count()

    total_records = db.query(Record).count()

    return {
        "total_users": total_users,
        "total_doctors": total_doctors,
        "total_staff": total_staff,
        "total_admins": total_admins,
        "total_clinics": total_clinics,
        "total_patients": total_patients,
        "total_records": total_records,
    }