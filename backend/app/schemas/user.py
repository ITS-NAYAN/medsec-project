from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str  # doctor/staff
    clinic_id: int


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    organization_id: int
    organization_code: str  # ✅ NEW (ORG CODE like ORG001)
    clinic_id: int | None = None

    class Config:
        from_attributes = True