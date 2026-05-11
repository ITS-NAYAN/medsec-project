from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from app.database import Base


class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String, nullable=False)
    record_type = Column(String)   # NEW
    description = Column(String)

    file_path = Column(String)     # NEW (file storage)
    hash = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)