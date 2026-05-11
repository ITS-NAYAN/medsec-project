# backend/app/models/user.py

from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)

    role = Column(String)

    organization_id = Column(Integer, ForeignKey("organizations.id"))
    clinic_id = Column(Integer, ForeignKey("clinics.id"), nullable=True)

    # 🔥 NEW (IMPORTANT)
    created_by = Column(Integer, nullable=True)