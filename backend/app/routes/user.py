# backend/app/routes/users.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.clinic import Clinic
from app.models.organization import Organization
from app.schemas.user import UserCreate, UserOut
from app.core.dependencies import require_role
from app.core.security import hash_password

router = APIRouter(prefix="/users", tags=["users"])


# ================= CREATE USER =================
@router.post("/", response_model=UserOut)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"])),
):
    # ✅ Validate role
    if user.role not in ["doctor", "staff"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid role. Use doctor/staff."
        )

    org_id = current_user["organization_id"]

    # ✅ Check clinic belongs to same organization
    clinic = db.query(Clinic).filter(
        Clinic.id == user.clinic_id,
        Clinic.organization_id == org_id
    ).first()

    if not clinic:
        raise HTTPException(
            status_code=400,
            detail="Invalid clinic for this organization"
        )

    # ✅ Check email already exists
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # ✅ Create user (WITH ownership)
    new_user = User(
        full_name=user.full_name.strip(),
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
        organization_id=org_id,
        clinic_id=user.clinic_id,

        # 🔥 NEW (DOES NOT BREAK ANYTHING)
        created_by=current_user["user_id"]
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # ✅ Get organization code (unchanged)
    org = db.query(Organization).filter(
        Organization.id == org_id
    ).first()

    org_code = org.code if org else ""

    return {
        "id": new_user.id,
        "full_name": new_user.full_name,
        "email": new_user.email,
        "role": new_user.role,
        "organization_id": new_user.organization_id,
        "organization_code": org_code,
        "clinic_id": new_user.clinic_id,
    }


# ================= LIST USERS =================
@router.get("/", response_model=list[UserOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"])),
):
    org_id = current_user["organization_id"]

    # 🔥 FIXED (IMPORTANT)
    users = db.query(User).filter(
        User.organization_id == org_id,                # keep org safety
        User.created_by == current_user["user_id"]     # isolate per admin
    ).all()

    # ✅ Get organization code (unchanged)
    org = db.query(Organization).filter(
        Organization.id == org_id
    ).first()

    org_code = org.code if org else ""

    result = []
    for u in users:
        result.append({
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "role": u.role,
            "organization_id": u.organization_id,
            "organization_code": org_code,
            "clinic_id": u.clinic_id,
        })

    return result