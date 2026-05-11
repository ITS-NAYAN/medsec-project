from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.organization import Organization
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    if data.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can self-register")

    if not data.full_name or not data.full_name.strip():
        raise HTTPException(status_code=400, detail="Full name is required")

    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    org = db.query(Organization).filter(Organization.code == data.organization_id).first()
    if not org:
        org = Organization(code=data.organization_id, name=data.organization_id)
        db.add(org)
        db.commit()
        db.refresh(org)

    new_user = User(
        full_name=data.full_name.strip(),
        email=data.email,
        password=hash_password(data.password),
        role="admin",
        organization_id=org.id,
        clinic_id=None,
    )
    db.add(new_user)
    db.commit()

    return {"message": "Admin registered successfully"}

@router.post("/login", response_model=TokenResponse)
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    org = db.query(Organization).filter(Organization.code == data.organization_id).first()
    if not org:
        raise HTTPException(status_code=400, detail="Invalid organization ID")

    user = db.query(User).filter(
        User.email == data.email,
        User.organization_id == org.id
    ).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if user.role != data.role:
        raise HTTPException(status_code=403, detail="Role mismatch")

    if user.role in ["doctor", "staff"] and not user.clinic_id:
        raise HTTPException(status_code=400, detail="Clinic not assigned. Contact admin.")

    token = create_access_token({
        "user_id": user.id,
        "role": user.role,
        "organization_id": org.id,
        "clinic_id": user.clinic_id
    })

    return {"access_token": token, "token_type": "bearer", "role": user.role}