from pydantic import BaseModel


class RecordCreate(BaseModel):
    patient_id: int
    title: str
    description: str


class RecordResponse(BaseModel):
    id: int
    patient_id: int
    title: str
    description: str

    class Config:
        from_attributes = True