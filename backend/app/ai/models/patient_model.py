# models/patient_model.py
# Defines the Patient input model with Pydantic validation.
# Pydantic automatically validates types, required fields, and ranges.

from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional


class PatientInput(BaseModel):
    """
    Represents the patient healthcare details sent to the API.
    Every field is validated automatically by Pydantic.
    """

    name: str = Field(..., min_length=2, max_length=100, description="Full name of the patient")
    age: int = Field(..., ge=0, le=120, description="Age of the patient in years")
    gender: str = Field(..., description="Gender: 'male', 'female', or 'other'")
    state: str = Field(..., min_length=2, max_length=50, description="Indian state name")
    annual_income: int = Field(..., ge=0, description="Annual household income in INR")
    disease: str = Field(..., min_length=2, max_length=200, description="Primary disease or health condition")
    bpl: bool = Field(default=False, description="Is the patient Below Poverty Line (BPL)?")
    disability: bool = Field(default=False, description="Does the patient have a disability?")
    pregnant: bool = Field(default=False, description="Is the patient pregnant?")
    senior_citizen: bool = Field(default=False, description="Is the patient a senior citizen (60+)?")

    # --- Validators ---

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, value: str) -> str:
        """Ensure gender is one of the accepted values."""
        allowed = {"male", "female", "other"}
        normalized = value.strip().lower()
        if normalized not in allowed:
            raise ValueError(f"Gender must be one of: {', '.join(allowed)}")
        return normalized

    @field_validator("state")
    @classmethod
    def validate_state(cls, value: str) -> str:
        """Normalize state name to title case for consistent matching."""
        return value.strip().title()

    @field_validator("disease")
    @classmethod
    def validate_disease(cls, value: str) -> str:
        """Normalize disease to lowercase for consistent matching."""
        return value.strip().lower()

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        """Strip extra spaces from name."""
        return value.strip()

    @model_validator(mode="after")
    def cross_field_validation(self) -> "PatientInput":
        """
        Cross-field validation rules:
        - Pregnancy only applies to female patients.
        - Senior citizen flag should match age >= 60.
        """
        if self.pregnant and self.gender != "female":
            raise ValueError("Pregnancy field can only be True for female patients.")

        # Auto-set senior_citizen if age >= 60 and flag not manually set
        if self.age >= 60 and not self.senior_citizen:
            self.senior_citizen = True  # Auto-correct for convenience

        return self

    class Config:
        # Allow extra fields to be ignored (future-proof)
        json_schema_extra = {
            "example": {
                "name": "Raj Sharma",
                "age": 62,
                "gender": "male",
                "state": "Maharashtra",
                "annual_income": 150000,
                "disease": "kidney disease",
                "bpl": True,
                "disability": False,
                "pregnant": False,
                "senior_citizen": True,
            }
        }
