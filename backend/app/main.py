import io
import pickle
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.api.predict import router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Diabetes API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
