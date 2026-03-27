/**
 * Centralized Axios API Client.
 *
 * All API calls should use this instance instead of raw axios.
 * - Base URL comes from environment variable (no more hardcoded localhost)
 * - Auth token is automatically attached to every request
 * - Handles 401 (expired token) globally
 */
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach auth token automatically
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('username');
            // Optionally redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
