# Swagger UI Testing Guide

## ✅ Verify Your API is Running

### Step 1: Start Backend

Make sure backend is running:

```bash
cd backend
python -m uvicorn main:app --reload --port 8001
```

You should see:
```
INFO:     Application startup complete
```

### Step 2: Open Swagger UI

Open your browser and go to:
```
http://localhost:8001/docs
```

✅ **You should see:** FastAPI Swagger UI with all endpoints listed

---

## 🔍 What You Should See

### Header
- **PrepHub API** title or "Guled's AI Assistant"
- List of all API routes

### Available Endpoints (Should be visible)

#### 1. ✅ Health Check
```
GET /health
```
- Status code: 200
- Response: `{"status": "PrepHub API LIVE ✅"}`

#### 2. ✅ Root Endpoint
```
GET /
```
- Response: Message about chatbot backend

#### 3. ✅ Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

#### 4. ✅ Courses Routes (`/api/courses`)
- `GET /api/courses` - List all courses
- `GET /api/courses/{course_id}` - Get single course
- `POST /api/courses` - Create course
- `PUT /api/courses/{course_id}` - Update course
- `DELETE /api/courses/{course_id}` - Delete course
- `GET /api/courses/category/{category}` - Filter by category

#### 5. ✅ Chat Endpoint
```
POST /chat
```

---

## 🧪 Quick Testing

### Test 1: Health Check (No Auth Required)

1. Click on **GET /health**
2. Click **"Try it out"**
3. Click **"Execute"**

**Expected Response:**
```json
{
  "status": "PrepHub API LIVE ✅"
}
```

---

### Test 2: Get All Courses

1. Click on **GET /api/courses**
2. Click **"Try it out"**
3. Click **"Execute"**

**Expected Response:**
- Status: 200 (or 500 if no database)
- List of courses (will be empty if no courses in DB)

---

### Test 3: Chat Endpoint

1. Click on **POST /chat**
2. Click **"Try it out"**
3. In the request body, replace with:
```json
{
  "message": "two pointers"
}
```
4. Click **"Execute"**

**Expected Response:**
```json
{
  "reply": "**DSA: Two Pointers**\nTwo Pointers: Valid Palindrome...",
  "confidence": 0.95
}
```

---

### Test 4: Register New User

1. Click on **POST /api/auth/register**
2. Click **"Try it out"**
3. In the request body, enter:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User",
  "role": "student"
}
```
4. Click **"Execute"**

**Expected Response (if database connected):**
```json
{
  "success": true,
  "message": "User created successfully!",
  "user_id": 1
}
```

**Or Error (if database not connected):**
```json
{
  "detail": "Database connection failed"
}
```

---

### Test 5: Login

1. Click on **POST /api/auth/login**
2. Click **"Try it out"**
3. In the request body, enter:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
4. Click **"Execute"**

**Expected Response (if user exists):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "student"
  }
}
```

---

## ⚠️ Troubleshooting

### ❌ Can't Access http://localhost:8001/docs

**Check:**
1. Is backend running? Look for "Application startup complete"
2. Is port 8001 correct? (Or use 8000 if not changed)
3. Check if server started successfully:
   ```bash
   curl http://localhost:8001/health
   ```

### ❌ No Endpoints Showing

**Check:**
1. Backend code has `@app.get()` decorators
2. Routes are imported: `from routes.auth import router`
3. Routers are included: `app.include_router(auth_router)`

### ❌ "Database connection failed"

**This is EXPECTED if:**
- MySQL is not running
- Database `prephub` not created
- `.env` has wrong credentials

Fix: See [TROUBLESHOOTING.md](../TROUBLESHOOTING.md#-issue-database-connection-failed)

### ❌ CORS Errors

**If you see CORS errors:**
1. Check CORS middleware in `main.py`
2. Verify `allow_origins` includes http://localhost:5173

---

## 📋 Full Verification Checklist

- [ ] Backend running on http://localhost:8001
- [ ] Swagger UI accessible at http://localhost:8001/docs
- [ ] `/health` endpoint returns 200
- [ ] `/` endpoint shows message
- [ ] `/chat` endpoint accepts POST requests
- [ ] `/api/auth/register` visible
- [ ] `/api/auth/login` visible
- [ ] `/api/courses` endpoints visible
- [ ] Can test chat with message
- [ ] No CORS errors in console

---

## 🎯 Next Steps

✅ **All endpoints visible and working?**
- Move to [Step 3: Test Frontend](../QUICK_START.md)

❌ **Errors or missing endpoints?**
- Check [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)
- Verify backend code has all decorators
- Ensure routers are imported in `main.py`

---

## 📚 Additional Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/tutorial/first-steps/)
- [Swagger UI Guide](https://swagger.io/tools/swagger-ui/)
- [Backend README](../backend/README.md)
- [Troubleshooting Guide](../TROUBLESHOOTING.md)

