import api from './Api';

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Contains user info and token
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Contains user info and token
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('token');
};