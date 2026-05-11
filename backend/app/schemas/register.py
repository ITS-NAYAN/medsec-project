from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    organization_id: str
    full_name: str
    email: EmailStr
    password: str
    role: str