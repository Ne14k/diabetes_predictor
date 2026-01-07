#!/bin/bash

set -e

printf "\nDiabetes Predictor Development\n\n"

if [ ! -d "backend/.venv" ]; then
  cd backend
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  deactivate
  cd ..
fi

printf "Starting backend\n"
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000 &
cd ..

sleep 2

printf "Starting frontend\n"
cd frontend
npm run dev &
cd ..

printf "Backend:  http://localhost:8000\n"
printf "Frontend: http://localhost:3000\n\n"

wait
