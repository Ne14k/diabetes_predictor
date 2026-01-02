from fastapi import APIRouter
from app.schemas.diabetes import DiabetesInput, DiabetesPrediction
from app.services.inference import predict_diabetes

router = APIRouter()

@router.post("/predict", response_model=DiabetesPrediction)
def predict(input: DiabetesInput):
    return predict_diabetes(input)