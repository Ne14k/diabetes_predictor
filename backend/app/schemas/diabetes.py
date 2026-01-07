from pydantic import BaseModel, Field

class DiabetesInput(BaseModel):
    pregnancies: int = Field(..., ge=0, le=20, description="Number of pregnancies")
    glucose: float = Field(..., ge=0, le=300, description="Glucose concentration")
    bloodPressure: float = Field(..., ge=0, le=200, description="Diastolic blood pressure (mm Hg)")
    skinThickness: float = Field(..., ge=0, le=100, description="Skin thickness (mm)")
    insulin: float = Field(..., ge=0, le=1000, description="Insulin level (mu U/ml)")
    bmi: float = Field(..., ge=10, le=70, description="Body mass index")
    diabetesPedigreeFunction: float = Field(..., ge=0.0, le=3.0, description="Diabetes pedigree function")
    age: int = Field(..., ge=1, le=120, description="Age (years)")

class DiabetesPrediction(BaseModel):
    outcome: int = Field(..., description="1 = Diabetes, 0 = No diabetes")
    probability: float = Field(..., ge=0.0, le=1.0)
    model_name: str