// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Your Oracle connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER - New user
router.post('/register', async (req, res) => {
    const { username, email, password, full_name, role } = req.body;
    
    try {
        // Hash password
        const password_hash = await bcrypt.hash(password, 10);
        
        // Insert user
        const result = await db.execute(
            `INSERT INTO users (username, email, password_hash, full_name, role) 
             VALUES (:1, :2, :3, :4, :5) RETURNING id`,
            [username, email, password_hash, full_name || '', role || 'student']
        );
        
        const userId = result.outBinds[0];
        res.json({ 
            success: true, 
            message: 'User created!', 
            user_id: userId 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'User already exists' });
    }
});

// LOGIN - Authenticate user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user
        const result = await db.execute(
            'SELECT id, username, email, password_hash, role FROM users WHERE email = :1',
            [email]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const user = result.rows[0];
        
        // Check password
        const validPassword = await bcrypt.compare(password, user[3]); // password_hash
        
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Create JWT token
        const token = jwt.sign(
            { user_id: user[0], username: user[1], role: user[4] }, 
            'your-secret-key', 
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: user[0],
                username: user[1],
                email: user[2],
                role: user[4]
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
