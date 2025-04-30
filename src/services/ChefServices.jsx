import api from './Api';

// Get Chef Data
export const getChefData = async (chefId) => {
  try {
    const response = await api.get(`/chef/${chefId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve chef data');
  }
};

// Update Chef Data
export const updateChefData = async (chefId, data) => {
  try {
    const response = await api.put(`/chef/${chefId}/update`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update chef data');
  }
};

// Get All Chefs
export const getAllChefs = async () => {
  try {
    const response = await api.get('/chef');
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve chefs');
  }
};