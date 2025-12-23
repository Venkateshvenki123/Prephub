# Backend — Run instructions

If port 8000 is already in use on your machine you can run the backend on a different port (e.g., 8001).

Windows (PowerShell):
```powershell
# Activate venv
.\venv\Scripts\Activate.ps1
# run on 127.0.0.1:8001
.\run_backend.ps1
```

Windows (CMD):
```cmd
REM Activate venv
.\venv\Scripts\activate.bat
REM run on 127.0.0.1:8001
.\run_backend.bat
```

Direct command (pick a port if 8000 is in use):
```cmd
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

Test the API (adjust port if needed):
```cmd
curl -X POST "http://127.0.0.1:8001/chat" -H "Content-Type: application/json" -d "{\"message\":\"two pointers\"}"
```

If you want the server to be reachable from other hosts (not just your machine), bind to `0.0.0.0` instead of `127.0.0.1` and ensure the port is allowed by firewall policies.
