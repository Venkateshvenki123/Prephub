# Authentication Components & Services

This directory contains authentication-related components and services for the PrepHub application.

## Files

### Components

#### `Login.jsx`
Login component for user authentication.

**Features:**
- Email and password input
- Error handling and display
- Loading state during submission
- Navigation to dashboard on successful login
- Link to registration page
- Styled with dark theme matching the app

**Usage:**
```jsx
import Login from './components/Auth/Login';

// In your router
<Route path="/login" element={<Login />} />
```

#### `Register.jsx`
Registration component for new user accounts.

**Features:**
- Full name, username, email, password inputs
- Role selection (Student/Admin)
- Password validation (minimum 6 characters)
- Success message with redirect to login
- Error handling
- Link back to login page

**Usage:**
```jsx
import Register from './components/Auth/Register';

// In your router
<Route path="/register" element={<Register />} />
```

#### `ProtectedRoute.jsx`
Higher-order component for protecting routes that require authentication.

**Features:**
- Checks if user is logged in
- Redirects to login if not authenticated
- Can be wrapped around any protected route

**Usage:**
```jsx
import ProtectedRoute from './components/ProtectedRoute';

// In your router
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Services

#### `auth.js`
Authentication service with API integration and state management.

**Features:**
- `register(userData)` - Register new user
- `login(credentials)` - Login user and save token
- `logout()` - Clear auth data and redirect to login
- `getCurrentUser()` - Get logged-in user data
- `isLoggedIn()` - Check authentication status
- `getToken()` - Get JWT token
- Automatic token attachment to requests
- Token expiration handling

**Usage:**
```jsx
import authService from './services/auth';

// In a component
const handleLogin = async () => {
  try {
    const result = await authService.login({ email, password });
    if (result.success) {
      // User is logged in
    }
  } catch (error) {
    console.error(error);
  }
};

// Check if user is logged in
if (authService.isLoggedIn()) {
  // User is authenticated
}

// Get current user
const user = authService.getCurrentUser();

// Logout
authService.logout();
```

## Complete Router Setup Example

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
```

## Environment Configuration

### Frontend (.env or hardcoded)
- Backend URL: `http://localhost:8000` (matches FastAPI backend)

### Backend Environment Variables
- `DB_HOST=localhost`
- `DB_USER=root`
- `DB_PASSWORD=your_password`
- `DB_NAME=prephub`
- `DB_PORT=3306`
- `SECRET_KEY=your-secret-key-change-in-production`

## API Endpoints

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
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

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
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

## Installation

1. Install axios (if not already installed):
```bash
npm install axios
```

2. Import components and services in your app:
```jsx
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/auth';
```

3. Set up routes in your main App component

4. Start the backend:
```bash
cd backend
python -m uvicorn main:app --reload
```

5. Start the frontend:
```bash
npm run dev
```

## Security Notes

- Tokens are stored in localStorage (consider using httpOnly cookies for production)
- JWT tokens expire after 24 hours
- Expired tokens trigger automatic logout
- Passwords are hashed with bcrypt on the backend
- All API communication should use HTTPS in production

## Troubleshooting

### Login fails with "Network Error"
- Ensure backend is running on `http://localhost:8000`
- Check if CORS is properly configured in FastAPI

### Token not persisting
- Check browser localStorage is enabled
- Verify token is being saved after login

### 401 Unauthorized errors
- Token may have expired, user needs to login again
- Clear localStorage and try logging in again
