from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    user_name = Column(String, nullable=False)

    role = Column(String, nullable=False)

    action = Column(String, nullable=False)

    resource = Column(String, nullable=False)

    details = Column(String, nullable=True)

    timestamp = Column(DateTime, default=datetime.utcnow)