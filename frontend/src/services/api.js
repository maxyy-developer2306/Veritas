import axios from 'axios';

// Automatically detect environment (Local vs Production)
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Agar local chala rahe hain toh localhost, warna naya live backend URL
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  return 'https://veritas-ten-xi.vercel.app/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Pass JWT token if available (Checking both 'token' and 'adminToken')
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;