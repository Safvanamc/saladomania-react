import api from './Api';

// Get all salads
export const listSalads = async () => {
  try {
    const response = await api.get('/salads');
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve salads');
  }
};

// Add a new salad
export const addSalad = async (saladData) => {
  try {
    const response = await api.post('/salads/add', saladData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add salad');
  }
};

// Update a salad
export const updateSalad = async (saladId, saladData) => {
  try {
    const response = await api.put(`/salads/update/${saladId}`, saladData); // ✅ Fixed template literal
    return response.data;
  } catch (error) {
    throw new Error('Failed to update salad');
  }
};

// View a salad
export const viewSalad = async (saladId) => {
  try {
    const response = await api.get(`/salads/${saladId}`); // ✅ Fixed template literal
    return response.data;
  } catch (error) {
    throw new Error('Failed to view salad');
  }
};
