# backend/app/models/patient.py

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime

from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    phone = Column(String)

    clinic_id = Column(Integer, ForeignKey("clinics.id"))
    created_by = Column(Integer, ForeignKey("users.id"))

    # ✅ NEW FIELDS
    last_visit = Column(DateTime, default=datetime.utcnow)
    next_visit = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)