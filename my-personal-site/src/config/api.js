// src/config/api.js
/**
 * API Configuration
 * Update API_BASE_URL if your backend is running on a different port
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    // Authentication
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    
    // Courses
    COURSES: `${API_BASE_URL}/api/courses`,
    COURSE_BY_ID: (id) => `${API_BASE_URL}/api/courses/${id}`,
    COURSES_BY_CATEGORY: (category) => `${API_BASE_URL}/api/courses/category/${category}`,
    
    // Chat
    CHAT: `${API_BASE_URL}/chat`
};

export default API_BASE_URL;
