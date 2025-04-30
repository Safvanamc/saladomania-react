import api from './Api';

// Create an order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response.data; // Return the created order details
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

// View an order
export const viewOrder = async (orderId) => {
  try {
    const response = await api.get(/orders/`${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve order');
  }
};

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data; // List of orders
  } catch (error) {
    throw new Error('Failed to retrieve orders');
  }
};