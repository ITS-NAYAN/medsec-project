from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from datetime import datetime

from app.database import Base


class RecordAccess(Base):
    __tablename__ = "record_access"

    id = Column(Integer, primary_key=True, index=True)

    # 🔗 What is being shared
    record_id = Column(Integer, ForeignKey("records.id"))

    # 🏥 From which clinic
    from_clinic_id = Column(Integer, ForeignKey("clinics.id"))

    # 🏥 To which clinic
    to_clinic_id = Column(Integer, ForeignKey("clinics.id"))

    # 👤 Who requested
    requested_by = Column(Integer, ForeignKey("users.id"))

    # 🔐 Status
    status = Column(String, default="pending")  
    # values: pending / approved / rejected

    # ⏳ Optional expiry
    expires_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)