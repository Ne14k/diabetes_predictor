import joblib
import numpy as np
from app.schemas.diabetes import DiabetesInput
from app.core.config import MODEL_PATH

model = joblib.load(MODEL_PATH)

DEFAULTS = {
    "BloodPressure": 72,
    "SkinThickness": 23,
    "Insulin": 80,
    "DiabetesPedigreeFunction": 0.47,
}

def predict_diabetes(data: DiabetesInput):
    values = data.model_dump()

    for k, v in DEFAULTS.items():
        if values.get(k) is None:
            values[k] = v

    features = np.array([[
        values["pregnancies"],
        values["glucose"],
        values["bloodPressure"],
        values["skinThickness"],
        values["insulin"],
        values["bmi"],
        values["diabetesPedigreeFunction"],
        values["age"],
    ]])

    prob = model.predict_proba(features)[0][1]

    return {
        "outcome": int(prob >= 0.5),
        "probability": round(prob, 4),
        "model_name": "diabetes_model_version1",
    }