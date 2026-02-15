# Quick Start Guide - PrepHub

Get the entire application running in minutes! 🚀

## Prerequisites

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **MySQL 5.7+** - [Download](https://www.mysql.com/downloads/)

## ⚡ Super Quick Start (5 minutes)

### Terminal 1: Backend Setup

```bash
cd backend

# Windows CMD
.\venv\Scripts\activate.bat

# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env from template
copy .env.example .env

# Edit .env with your database password
# Then run backend
python -m uvicorn main:app --reload --port 8000
```

✅ Backend running: http://localhost:8000/docs

### Terminal 2: Frontend Setup

```bash
# In project root (not in backend folder)
npm install
npm run dev
```

✅ Frontend running: http://localhost:5173

---

## Step-by-Step Setup

### 1. Backend Configuration

```bash
cd backend
```

**Create virtual environment:**
```bash
python -m venv venv
```

**Activate virtual environment:**
- **Windows CMD**: `.\venv\Scripts\activate.bat`
- **Windows PowerShell**: `.\venv\Scripts\Activate.ps1`

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Set up environment variables:**
```bash
copy .env.example .env
```

Edit `.env` with your database credentials:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=prephub
DB_PORT=3306
```

### 2. Database Setup

**Create database:**
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS prephub;"
```

**Import schema:**
```bash
mysql -u root -p prephub < database/schema.sql
```

### 3. Start Backend

```bash
python -m uvicorn main:app --reload --port 8000
```

✅ Server running at: **http://localhost:8000/docs**

### 4. Frontend Setup

**In a new terminal (stay at project root):**

```bash
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## 🧪 Test Everything

### Test Backend API

**Option 1: Swagger UI**
- Open: http://localhost:8000/docs
- Try out any endpoint

**Option 2: Command Line**
```bash
# Test chat endpoint
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"two pointers\"}"
```

### Test Frontend
- Open: http://localhost:5173
- Navigate around the app
- Try login/register if database is set up

---

## ⚠️ Port Already in Use?

If you get "Address already in use" error:

**Quick Fix - Use Different Port:**
```bash
python -m uvicorn main:app --reload --port 8001
```

Then update frontend `.env.local` in project root:
```
VITE_API_BASE_URL=http://localhost:8001
```

**For detailed solutions**, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 📁 Project Structure

```
.
├── backend/                    # Backend (Python/FastAPI)
│   ├── main.py                # Main application
│   ├── routes/
│   │   ├── auth.py           # Login/Register
│   │   └── courses.py        # Courses CRUD
│   ├── config/
│   │   └── database.py       # Database connection
│   ├── database/
│   │   └── schema.sql        # Database schema
│   └── requirements.txt       # Python dependencies
│
├── src/                        # Frontend (React/Vite)
│   ├── components/
│   │   ├── Auth/             # Login/Register forms
│   │   ├── Navbar.jsx        # Navigation
│   │   ├── Chatbot.jsx       # Chat interface
│   │   └── CoursesTable.jsx  # Courses table
│   ├── Pages/                # Page components
│   ├── services/
│   │   └── auth.js           # Authentication service
│   ├── config/
│   │   └── api.js            # API configuration
│   └── App.jsx               # Root component
│
├── package.json              # Frontend dependencies
├── .env.example              # Frontend env template
└── TROUBLESHOOTING.md        # Common issues & fixes
```

---

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get single course
- `POST /api/courses` - Create course (admin)

### Chat
- `POST /chat` - Send message to chatbot

---

## 📚 Full Documentation

- **[Backend README](backend/README.md)** - Backend API endpoints & setup
- **[TROUBLESHOOTING](TROUBLESHOOTING.md)** - Common issues & fixes
- **[Frontend Auth Guide](src/components/Auth/README.md)** - Frontend components

---

## 🚀 Deployment

### Backend
See [backend/README.md](backend/README.md) for production deployment

### Frontend
```bash
npm run build
```

Generates optimized build in `dist/` folder ready for deployment

---

## ❓ Need Help?

1. **Backend issues?** See [backend/README.md](backend/README.md)
2. **Port conflicts?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. **Database errors?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#-issue-database-connection-failed)
4. **Frontend issues?** See [src/components/Auth/README.md](src/components/Auth/README.md)

---

## ✅ Verification Checklist

- [ ] Python 3.8+ installed and in PATH
- [ ] MySQL running with root access
- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with correct database credentials
- [ ] Database `prephub` created
- [ ] Schema imported
- [ ] Backend running on http://localhost:8000
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend running on http://localhost:5173
- [ ] Can navigate frontend without errors

---

Happy coding! 🎉
