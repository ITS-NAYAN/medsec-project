from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str  # must be admin
    organization_id: str  # organization code

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str
    organization_id: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str