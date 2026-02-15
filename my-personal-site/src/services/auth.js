// src/services/auth.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const authAPI = axios.create({
    baseURL: API_ENDPOINTS.LOGIN.replace('/login', ''),
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
authAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle responses
authAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await authAPI.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, detail: 'Registration failed' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await authAPI.post('/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { success: false, detail: 'Login failed' };
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Get current user
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is logged in
    isLoggedIn: () => {
        return !!localStorage.getItem('token');
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('token');
    }
};

export default authService;
