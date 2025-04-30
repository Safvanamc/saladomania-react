import axios from 'axios';

// API endpoint base URL
const API_URL = '/api/ingredients';

// Function to add a new ingredient
export const addIngredient = async (ingredientData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, ingredientData, {
      headers: {
        'Authorization': Bearer `${localStorage.getItem('token')}`, // assuming the token is stored in localStorage
      },
    });

    return response.data; // return the response data to handle in the component
  } catch (err) {
    throw new Error('Failed to add ingredient. Please try again later.');
  }
};

// Function to view an ingredient by its ID
export const viewIngredient = async (ingredientId) => {
  try {
    const response = await axios.post(`${API_URL}/view`, { ingredient_id: ingredientId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch ingredient. Please try again later.');
  }
};

// Function to update an ingredient
export const updateIngredient = async (ingredientId, ingredientData) => {
  try {
    const response = await axios.put(`${API_URL}/update`, { ingredient_id: ingredientId, ...ingredientData }, {
      headers: {
        'Authorization': Bearer `${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Failed to update ingredient. Please try again later.');
  }
};

// Function to delete an ingredient
export const deleteIngredient = async (ingredientId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, {
      data: { ingredient_id: ingredientId },
      headers: {
        'Authorization': Bearer `${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Failed to delete ingredient. Please try again later.');
  }
};