import api from './Api';

export const getAllChefs = async () => {
  const res = await api.get('/admin/chefs');
  return res.data;
};

export const deleteChef = async (chefId) => {
  await api.delete(`/admin/chefs/${chefId}`); // ✅ Corrected
};

export const getUnassignedOrders = async () => {
  const res = await api.get('/admin/orders/unassigned');
  return res.data;
};

export const assignOrderToChef = async (orderId, chefId) => {
  await api.post(`/admin/orders/${orderId}/assign`, { chefId }); // ✅ Corrected
};
