// backend/server.js
// NOTE: This is a reference implementation. Your main backend is in Python/FastAPI (main.py)
// Use this file only if you want to switch to Node.js/Express backend

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'PrepHub API is running ✅' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 PrepHub API running on http://localhost:${PORT}`);
    console.log(`📝 Auth routes: http://localhost:${PORT}/api/auth`);
    console.log(`📚 Courses routes: http://localhost:${PORT}/api/courses\n`);
});
