from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.organization import Organization
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationOut,
)

router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"],
)


# =========================================
# Create Organization
# =========================================
@router.post("/", response_model=OrganizationOut)
def create_organization(
    data: OrganizationCreate,
    db: Session = Depends(get_db),
):
    org = Organization(
        name=data.name,
        code=data.code,
        description=data.description,
    )

    db.add(org)
    db.commit()
    db.refresh(org)

    return org


# =========================================
# Get Organizations
# =========================================
@router.get("/", response_model=list[OrganizationOut])
def get_organizations(
    db: Session = Depends(get_db),
):
    return db.query(Organization).all()