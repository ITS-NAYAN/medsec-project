from pydantic import BaseModel


class ClinicCreate(BaseModel):
    organization_id: int
    name: str
    location: str | None = None
    status: str = "Active"


class ClinicOut(BaseModel):
    id: int
    organization_id: int
    organization_code: str
    name: str
    location: str | None = None
    admin_email: str | None = None
    status: str

    class Config:
        from_attributes = True