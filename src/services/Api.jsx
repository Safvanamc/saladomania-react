import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: '/api', // Assuming the base URL for the API is /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can intercept requests and responses to handle token, errors, etc.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default api;