import axios from 'axios';

// Base API URL - change this to your backend URL
// If backend runs on different port, change 5000 to your port:
// Port 3000: 'http://localhost:3000/api'
// Port 5000: 'http://localhost:5000/api'
const API_BASE_URL = 'http://localhost:5000/api';

console.log('🔧 API Base URL:', API_BASE_URL);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('🔑 Token found, adding to request');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('⚠️ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('📤 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.error(
      '📥 API Error:',
      error.response?.status,
      error.response?.statusText,
      error.config?.url,
      error.response?.data
    );

    const originalRequest = error.config;

    // If token expired, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          console.log('🔄 Attempting token refresh...');
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { token } = response.data;
          localStorage.setItem('accessToken', token);
          console.log('✅ Token refreshed successfully');

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          console.warn('❌ No refresh token available');
          // Clear localStorage and redirect to login
          localStorage.clear();
          window.location.href = '/signin';
        }
      } catch (refreshError) {
        console.error('🔄 Token refresh failed:', refreshError);
        // If refresh fails, logout user
        localStorage.clear();
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
