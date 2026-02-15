# Configuration Guide

## Backend Configuration

### Environment Variables (`.env`)

Located in `backend/` directory. Copy from `.env.example`:

```bash
cp backend/.env.example backend/.env
```

#### Required Variables

```ini
# Database Configuration
DB_HOST=localhost           # MySQL server host
DB_USER=root               # MySQL username
DB_PASSWORD=yourpassword   # MySQL password
DB_NAME=prephub            # Database name
DB_PORT=3306               # MySQL port (default 3306)

# Server Configuration  
HOST=127.0.0.1             # Server host (127.0.0.1 = localhost only)
PORT=8000                  # Server port (change if 8000 is busy)
RELOAD=true                # Auto-reload on code changes (dev only)

# Security
SECRET_KEY=your-secret-key-change-in-production-12345

# JWT
ALGORITHM=HS256            # Don't change
ACCESS_TOKEN_EXPIRE_HOURS=24
```

#### Optional Variables

```ini
# CORS (Frontend URL)
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

### Database Setup

#### MySQL Connection

Using `.env` values:
```bash
mysql -u root -p
```

#### Create Database

```sql
CREATE DATABASE IF NOT EXISTS prephub;
USE prephub;
```

#### Import Schema

From backend directory:
```bash
mysql -u root -p prephub < database/schema.sql
```

Or manually:
```bash
cd backend/database
mysql -u root -p prephub < schema.sql
```

#### Verify Schema

```bash
mysql -u root -p prephub -e "SHOW TABLES;"
```

Should show:
- users
- courses
- jobs
- internships
- interview_prep
- notes
- enrollments

---

## Frontend Configuration

### Environment Variables (`.env.local`)

Located in project root directory:

```bash
# Backend API Base URL
# Change port if backend is running on different port
VITE_API_BASE_URL=http://localhost:8000

# If backend is on 8001:
# VITE_API_BASE_URL=http://localhost:8001

# Development settings (optional)
VITE_DEBUG=false
```

### Runtime Configuration

Update in `src/config/api.js` if needed:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

---

## Running on Different Ports

### Backend on Port 8001

```bash
# Option 1: Command line
python -m uvicorn main:app --reload --port 8001

# Option 2: Update .env
PORT=8001
python -m uvicorn main:app --reload
```

Then update frontend `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8001
```

### Frontend on Port 3000

Edit `vite.config.js`:
```javascript
export default {
  server: {
    port: 3000
  }
}
```

Then run:
```bash
npm run dev
```

---

## Production Configuration

### Backend

Update `.env` for production:

```ini
HOST=0.0.0.0                    # Listen on all interfaces
RELOAD=false                    # Disable auto-reload
SECRET_KEY=generate-long-random-key-here-minimum-32-chars
CORS_ORIGINS=["https://yourdomain.com"]
```

Start with Gunicorn (production ASGI server):

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Frontend

```bash
npm run build
```

Creates optimized build in `dist/` folder. Deploy to static hosting (Vercel, Netlify, etc.)

---

## Troubleshooting Configuration Issues

### Issue: "Invalid database credentials"

**Check:**
1. MySQL is running: `mysql -u root -p`
2. Database exists: `mysql -e "SHOW DATABASES;"`
3. `.env` has correct credentials
4. No special characters in password without escaping

**Fix:**
```bash
# Reset MySQL root password if needed
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
```

### Issue: Backend can't find `.env` file

**Ensure `.env` is in `backend/` directory, not project root:**
```
my-personal-site/
├── backend/
│   ├── .env              ← Here!
│   ├── main.py
│   └── ...
├── src/
└── ...
```

### Issue: Frontend can't connect to backend

**Check:**
1. Backend is running: http://localhost:8000/docs
2. `VITE_API_BASE_URL` is correct in `.env.local`
3. CORS is enabled in backend
4. Ports don't conflict

**Debug:**
```bash
# Check if backend is running
curl http://localhost:8000/docs

# Check frontend env vars (in browser console)
console.log(import.meta.env.VITE_API_BASE_URL)
```

---

## Configuration Summary

| Component | Config File | Key Settings |
|-----------|------------|--------------|
| Backend | `backend/.env` | DB creds, Port, Secret Key |
| Frontend | `.env.local` | API Base URL |
| MySQL | System | Running, Database created |
| CORS | `backend/.env` | FRONTEND_URL |
| JWT | `backend/.env` | SECRET_KEY, ALGORITHM |

---

## Useful Configuration Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [MySQL Configuration](https://dev.mysql.com/doc/)

