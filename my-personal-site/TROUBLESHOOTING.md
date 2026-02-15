# Troubleshooting Guide

## Common Issues & Solutions

### ❌ Issue: "Address already in use" or Port 8000 Not Available

**Error Message:**
```
ERROR: Address already in use
OR
OSError: [Errno 48] Address already in already in use
```

#### 🚀 QUICK FIX #1: Use Different Port (Recommended)

Use port `8001` instead:

**Command:**
```bash
python -m uvicorn main:app --reload --port 8001
```

**Access**: http://localhost:8001/docs

**Update Frontend** (if needed):
Create `.env.local` in project root:
```
VITE_API_BASE_URL=http://localhost:8001
```

---

### ❌ Issue: Kill Process Using Port 8000

If you need to use port 8000 specifically:

#### Step 1: Check What's Using Port 8000 (Windows)

**Windows CMD:**
```cmd
netstat -ano | findstr :8000
```

**Example Output:**
```
TCP    127.0.0.1:8000         0.0.0.0:0              LISTENING       1234
```

The `1234` is the Process ID (PID)

#### Step 2: Kill the Process

**Windows CMD:**
```cmd
taskkill /PID 1234 /F
```

Replace `1234` with your actual PID

#### Step 3: Verify and Run Server

```bash
python -m uvicorn main:app --reload --port 8000
```

---

### ❌ Issue: Run as Administrator

If you get permission errors:

1. **Right-click Command Prompt** → "Run as administrator"
2. **Navigate to backend:**
   ```cmd
   cd "D:\Personal website\my-personal-site\backend"
   ```
3. **Start uvicorn:**
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

---

### ❌ Issue: Previous UVicorn Still Running

**Most Common Cause!**

If you tried to start the server earlier and it's still running:

**Quick Fix:**
```cmd
Ctrl+C
```

Press `Ctrl+C` in the terminal where the old server is running

**Nuclear Option** (kills ALL Python processes):
```bash
taskkill /IM python.exe /F
```

Then restart:
```bash
python -m uvicorn main:app --reload --port 8000
```

---

### ❌ Issue: Windows Firewall Blocking Port

If Windows Firewall is blocking access:

1. **Open Windows Firewall with Advanced Security:**
   - Press `Windows Key + R`
   - Type `wf.msc`
   - Press Enter

2. **Create New Inbound Rule:**
   - Left panel: Click "Inbound Rules"
   - Right panel: Click "New Rule..."

3. **Configure Rule:**
   - Select "Port" → Click "Next"
   - Select "TCP"
   - Specific local ports: `8000` → Click "Next"
   - Select "Allow the connection" → Click "Next"
   - Apply to all profiles (all checked) → Click "Next"
   - Name: `Uvicorn FastAPI`
   - Click "Finish"

4. Try accessing: http://localhost:8000/docs

---

### ❌ Issue: ModuleNotFoundError or Import Errors

**Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
1. **Ensure virtual environment is activated:**

   **Windows CMD:**
   ```cmd
   .\venv\Scripts\activate.bat
   ```

   **Windows PowerShell:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

2. **Reinstall dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

---

### ❌ Issue: Database Connection Failed

**Error:**
```
Database connection failed
OR
Access denied for user 'root'@'localhost'
```

**Solution:**
1. **Verify MySQL is running:**
   - Windows: Check Services (services.msc)
   - Ensure "MySQL" or "MySQL80" is running

2. **Check `.env` file:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=prephub
   DB_PORT=3306
   ```

3. **Verify database exists:**
   ```sql
   CREATE DATABASE IF NOT EXISTS prephub;
   ```

4. **Import schema:**
   ```bash
   mysql -u root -p prephub < database/schema.sql
   ```

---

### ✅ Verify Everything Works

After fixing the issue, test the API:

**1. Check Server Status:**
```
http://localhost:8000 (or 8001)
```

**2. View API Documentation:**
```
http://localhost:8000/docs
```

**3. Test Login Endpoint:**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**4. Test Chat Endpoint:**
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"two pointers\"}"
```

---

## Setup Checklist

- [ ] Python 3.8+ installed
- [ ] Virtual environment activated
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] `.env` file configured with database credentials
- [ ] MySQL running and `prephub` database created
- [ ] Schema imported: `mysql -u root -p prephub < database/schema.sql`
- [ ] Backend started: `python -m uvicorn main:app --reload --port 8000`
- [ ] API docs accessible: http://localhost:8000/docs
- [ ] Frontend `.env.local` configured (if needed)
- [ ] Frontend running: `npm run dev`

---

## Quick Start Commands

### Backend
```bash
# Windows CMD
cd backend
.\venv\Scripts\activate.bat
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# Or with PowerShell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend
```bash
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Still Having Issues?

1. **Check all error messages carefully** - they usually indicate the exact problem
2. **Verify ports are correct** in both backend and frontend configuration
3. **Ensure MySQL is running** and database is created
4. **Check firewall settings** - may be blocking port access
5. **Try a different port** (8001, 8002, etc.) if 8000 is unavailable
6. **Restart everything** - sometimes a fresh start fixes transient issues

For more help, check the main [README.md](./README.md) or create an issue in the repository.
