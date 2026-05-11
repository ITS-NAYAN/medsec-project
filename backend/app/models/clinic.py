from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Clinic(Base):
    __tablename__ = "clinics"

    id = Column(Integer, primary_key=True, index=True)

    # 🔗 Organization relation
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)

    # 📌 Clinic details
    name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    status = Column(String, nullable=True)

    # 👤 Who created this clinic
    created_by = Column(Integer, nullable=True)