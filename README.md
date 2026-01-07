# Diabetes Predictor

A simple full-stack application that provides diabetes risk predictions using a machine learning model (xgb, RandomSearch) trained off Pima data using input features (insulin, bmi, age, etc.).

---

## Dataset
https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data

--- 

## API Endpoints

| Method | Endpoint   | Description                                  |
|------|------------|----------------------------------------------|
| GET  | `/`        | Root endpoint                                |
| GET  | `/health`  | Health check                                 |
| POST | `/predict` | Predict diabetes risk based on input features |

---

## Running the Project Locally

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

```bash
chmod +x start.sh
./start.sh
