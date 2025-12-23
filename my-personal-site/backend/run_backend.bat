@echo off
REM Run backend on localhost:8001 (use if port 8000 is occupied)
set "HOST=127.0.0.1"
set "PORT=8001"
python -m uvicorn main:app --reload --host %HOST% --port %PORT%
