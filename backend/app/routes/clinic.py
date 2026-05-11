from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.clinic import Clinic
from app.models.organization import Organization
from app.models.user import User

from app.schemas.clinic import ClinicCreate, ClinicOut

from app.core.dependencies import require_role

router = APIRouter(
    prefix="/clinics",
    tags=["clinics"]
)


# =========================================================
# CREATE CLINIC
# =========================================================
@router.post("/", response_model=ClinicOut)
def create_clinic(
    data: ClinicCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):

    # =====================================================
    # ORGANIZATION SELECTION
    # =====================================================

    # frontend dropdown sends organization_id
    org_id = data.organization_id

    # verify organization exists
    organization = db.query(Organization).filter(
        Organization.id == org_id
    ).first()

    if not organization:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    # =====================================================
    # CREATE CLINIC
    # =====================================================

    clinic = Clinic(
        organization_id=org_id,
        name=data.name,
        location=data.location,
        status=data.status,
        created_by=current_user["user_id"]
    )

    db.add(clinic)
    db.commit()
    db.refresh(clinic)

    # =====================================================
    # GET ADMIN EMAIL
    # =====================================================

    admin = db.query(User).filter(
        User.organization_id == org_id,
        User.role == "admin"
    ).first()

    admin_email = admin.email if admin else None

    # =====================================================
    # RESPONSE
    # =====================================================

    return {
        "id": clinic.id,
        "organization_id": clinic.organization_id,
        "organization_code": organization.code,
        "name": clinic.name,
        "location": clinic.location,
        "admin_email": admin_email,
        "status": clinic.status,
    }


# =========================================================
# LIST CLINICS
# =========================================================
@router.get("/", response_model=list[ClinicOut])
def list_clinics(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):

    # =====================================================
    # ONLY SHOW CLINICS CREATED BY CURRENT ADMIN
    # =====================================================

    clinics = db.query(Clinic).filter(
        Clinic.created_by == current_user["user_id"]
    ).all()

    result = []

    for clinic in clinics:

        organization = db.query(Organization).filter(
            Organization.id == clinic.organization_id
        ).first()

        admin = db.query(User).filter(
            User.organization_id == clinic.organization_id,
            User.role == "admin"
        ).first()

        result.append({
            "id": clinic.id,
            "organization_id": clinic.organization_id,
            "organization_code": organization.code if organization else "",
            "name": clinic.name,
            "location": clinic.location,
            "admin_email": admin.email if admin else None,
            "status": clinic.status,
        })

    return result


# =========================================================
# LIST ALL CLINICS
# =========================================================
@router.get("/all")
def list_all_clinics(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role(["admin", "doctor", "staff"])
    )
):

    clinics = db.query(Clinic).all()

    return [
        {
            "id": clinic.id,
            "name": clinic.name
        }
        for clinic in clinics
    ]