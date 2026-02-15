// backend/routes/courses.js
// NOTE: This is a reference implementation. Your main backend is in Python (routes/courses.py)

const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Your database connection

// GET all courses
router.get('/', async (req, res) => {
    const { category, level } = req.query;
    
    try {
        let query = `
            SELECT id, title, description, category, level, is_free, url,
                   CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
            FROM courses WHERE 1=1
        `;
        let params = [];
        
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        
        if (level) {
            query += ' AND level = ?';
            params.push(level);
        }
        
        const courses = await db.execute(query, params);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching courses', error: error.toString() });
    }
});

// GET single course by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await db.execute(
            `SELECT id, title, description, category, level, is_free, url,
                    CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
             FROM courses WHERE id = ?`,
            [req.params.id]
        );
        
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching course', error: error.toString() });
    }
});

// POST create new course
router.post('/', async (req, res) => {
    const { title, description, category, level, is_free, url } = req.body;
    
    try {
        const result = await db.execute(
            `INSERT INTO courses (title, description, category, level, is_free, url, created_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [title, description, category, level || 'beginner', is_free || true, url]
        );
        
        res.status(201).json({
            success: true,
            message: 'Course created successfully!',
            course_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating course', error: error.toString() });
    }
});

// PUT update course
router.put('/:id', async (req, res) => {
    const { title, description, category, level, is_free, url } = req.body;
    
    try {
        // Check if course exists
        const checkResult = await db.execute('SELECT id FROM courses WHERE id = ?', [req.params.id]);
        if (checkResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        
        await db.execute(
            `UPDATE courses 
             SET title=?, description=?, category=?, level=?, is_free=?, url=?, updated_at=NOW()
             WHERE id=?`,
            [title, description, category, level, is_free, url, req.params.id]
        );
        
        res.json({
            success: true,
            message: 'Course updated successfully!',
            course_id: req.params.id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating course', error: error.toString() });
    }
});

// DELETE course
router.delete('/:id', async (req, res) => {
    try {
        // Check if course exists
        const checkResult = await db.execute('SELECT id FROM courses WHERE id = ?', [req.params.id]);
        if (checkResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        
        await db.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
        
        res.json({
            success: true,
            message: 'Course deleted successfully!',
            course_id: req.params.id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting course', error: error.toString() });
    }
});

// GET courses by category
router.get('/category/:category', async (req, res) => {
    try {
        const courses = await db.execute(
            `SELECT id, title, description, category, level, is_free, url,
                    CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
             FROM courses WHERE category = ?`,
            [req.params.category]
        );
        
        res.json(courses);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching courses', error: error.toString() });
    }
});

module.exports = router;
