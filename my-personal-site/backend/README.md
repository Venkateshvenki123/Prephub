# Backend — Run instructions

## ⚠️ Port Already in Use?

If you get "Address already in use" error, see [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) **OR** use a different port:

```bash
python -m uvicorn main:app --reload --port 8001
```

Then update frontend `.env.local`: `VITE_API_BASE_URL=http://localhost:8001`

---

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
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Or use port 8001 (if 8000 is busy):
```cmd
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

Using environment variables:
```cmd
set HOST=127.0.0.1 & set PORT=8000 & python -m uvicorn main:app --reload
```

Test the API (adjust port if needed):
```cmd
curl -X POST "http://127.0.0.1:8001/chat" -H "Content-Type: application/json" -d "{\"message\":\"two pointers\"}"
```

If you want the server to be reachable from other hosts (not just your machine), bind to `0.0.0.0` instead of `127.0.0.1` and ensure the port is allowed by firewall policies.

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "role": "student"
}

Response:
{
  "success": true,
  "message": "User created successfully!",
  "user_id": 1
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Courses Routes (`/api/courses`)

#### Get All Courses
```
GET /api/courses
GET /api/courses?category=React&level=beginner

Response:
[
  {
    "id": 1,
    "title": "React Fundamentals",
    "description": "Learn React basics...",
    "category": "React",
    "level": "beginner",
    "is_free": true,
    "url": "https://...",
    "cert_status": "✅ FREE CERTIFICATE"
  },
  ...
]
```

#### Get Course by ID
```
GET /api/courses/{course_id}

Response:
{
  "id": 1,
  "title": "React Fundamentals",
  "description": "Learn React basics...",
  "category": "React",
  "level": "beginner",
  "is_free": true,
  "url": "https://...",
  "cert_status": "✅ FREE CERTIFICATE"
}
```

#### Get Courses by Category
```
GET /api/courses/category/{category}

Response:
[
  {
    "id": 1,
    "title": "React Fundamentals",
    ...
  }
]
```

#### Create Course (Admin)
```
POST /api/courses
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Advanced React",
  "description": "Learn advanced React patterns",
  "category": "React",
  "level": "advanced",
  "is_free": false,
  "url": "https://example.com/course"
}

Response:
{
  "success": true,
  "message": "Course created successfully!",
  "course_id": 5
}
```

#### Update Course (Admin)
```
PUT /api/courses/{course_id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Updated Course Title",
  "description": "Updated description",
  "category": "React",
  "level": "intermediate",
  "is_free": true,
  "url": "https://..."
}

Response:
{
  "success": true,
  "message": "Course updated successfully!",
  "course_id": 1
}
```

#### Delete Course (Admin)
```
DELETE /api/courses/{course_id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Course deleted successfully!",
  "course_id": 1
}
```

## Environment Setup

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Then edit `.env` with your actual values:
```
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=prephub
DB_PORT=3306

# Server (optional - defaults to 127.0.0.1:8000)
HOST=127.0.0.1
PORT=8000

# JWT Secret (change this in production!)
SECRET_KEY=your-secret-key-change-in-production
```

### Chat Routes

#### Send Chat Message (Chatbot)
```
POST /chat
Content-Type: application/json

{
  "message": "two pointers"
}

Response:
{
  "reply": "**DSA: Two Pointers**\nTwo Pointers: Valid Palindrome...",
  "confidence": 0.95
}
```

## Server Implementations

**Primary**: Python/FastAPI (`main.py`) - Port 8000
**Alternative**: Node.js/Express (`server.js`) - Port 5000 (reference only)

## Complete Setup Guide (First Time)

### Step 1: Prerequisites
- Python 3.8+
- MySQL Server running
- pip (Python package manager)

### Step 2: Create Virtual Environment
```bash
cd backend
Python -m venv venv
```

### Step 3: Activate Virtual Environment

**Windows CMD:**
```cmd
.\venv\Scripts\activate.bat
```

**Windows PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Create & Configure `.env` File
```bash
copy .env.example .env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=prephub
DB_PORT=3306
SECRET_KEY=your-secret-key-12345
```

### Step 6: Create Database
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS prephub;"
```

### Step 7: Import Schema
```bash
mysql -u root -p prephub < database/schema.sql
```

### Step 8: Run Backend
```bash
python -m uvicorn main:app --reload --port 8000
```

✅ Backend is now running! Access: http://localhost:8000/docs

### Step 9: Update Frontend (if needed)

If backend is on different port, create `.env.local` in project root:
```
VITE_API_BASE_URL=http://localhost:8000
```

### Step 10: Run Frontend
```bash
cd ..
npm install
npm run dev
```

✅ Frontend is now running! Access: http://localhost:5173

---

## Troubleshooting

If you encounter issues, see the [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) guide for:
- Port already in use
- Database connection errors
- Permission issues
- Firewall blocking
- Import errors

**Quick Fix for Port Issues:**
```bash
# Use port 8001 instead
python -m uvicorn main:app --reload --port 8001
```

---

## Project Structure
```
backend/
├── main.py                 # Main FastAPI application
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Example environment file
├── routes/
│   ├── auth.py            # Authentication endpoints
│   └── courses.py         # Courses CRUD endpoints
├── config/
│   └── database.py        # Database configuration
├── database/
│   └── schema.sql         # MySQL schema
└── README.md              # This file
```
