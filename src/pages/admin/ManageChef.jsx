import React, { useEffect, useState } from 'react';
import {Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAllChefs, getUnassignedOrders, assignOrderToChef, deleteChef } from '../../services/AdminServices';

const ManageChef = () => {
  const [chefs, setChefs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedChef, setSelectedChef] = useState({});

  useEffect(() => {
    fetchChefs();
    fetchOrders();
  }, []);

  const fetchChefs = async () => {
    try {
      const data = await getAllChefs();
      setChefs(data);
    } catch (err) {
      console.error('Failed to fetch chefs:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getUnassignedOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const handleAssign = async (orderId) => {
    if (!selectedChef[orderId]) return;
    try {
      await assignOrderToChef(orderId, selectedChef[orderId]);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Failed to assign order:', err);
    }
  };

  const handleDeleteChef = async (chefId) => {
    try {
      await deleteChef(chefId);
      setChefs(chefs.filter((chef) => chef._id !== chefId));
    } catch (err) {
      console.error('Failed to delete chef:', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Chefs
      </Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>Chefs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chefs.map((chef) => (
            <TableRow key={chef._id}>
              <TableCell>{chef.name}</TableCell>
              <TableCell>{chef.email}</TableCell>
              <TableCell>{chef.status}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => handleDeleteChef(chef._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 6 }}>Unassigned Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Salad</TableCell>
            <TableCell>Select Chef</TableCell>
            <TableCell>Assign</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.user?.name}</TableCell>
              <TableCell>{order.salad?.name}</TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <InputLabel>Chef</InputLabel>
                  <Select
                    value={selectedChef[order._id] || ''}
                    label="Chef"
                    onChange={(e) =>
                      setSelectedChef({ ...selectedChef, [order._id]: e.target.value })
                    }
                  >
                    {chefs.map((chef) => (
                      <MenuItem key={chef._id} value={chef._id}>
                        {chef.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAssign(order._id)}
                  disabled={!selectedChef[order._id]}
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageChef;