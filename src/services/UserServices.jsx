import api from './Api';

// Get User Data
export const getUserData = async (userId) => {
  try {
    const response = await api.get(/users/`${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve user data');
  }
};

// Update User Info
export const updateUserData = async (userId, userData) => {
  try {
    const response = await api.put(/users/`${userId}`/update, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user data');
  }
};