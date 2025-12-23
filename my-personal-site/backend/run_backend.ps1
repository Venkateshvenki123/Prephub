# Run backend on localhost:8001 (use if port 8000 is occupied)
$env:HOST = "127.0.0.1"
$env:PORT = "8001"
python -m uvicorn main:app --reload --host $env:HOST --port $env:PORT
