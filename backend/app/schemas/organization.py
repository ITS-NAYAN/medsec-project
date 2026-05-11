from pydantic import BaseModel


# =========================
# CREATE ORGANIZATION
# =========================
class OrganizationCreate(BaseModel):
    name: str
    code: str


# =========================
# RESPONSE
# =========================
class OrganizationOut(BaseModel):
    id: int
    name: str
    code: str

    class Config:
        from_attributes = True