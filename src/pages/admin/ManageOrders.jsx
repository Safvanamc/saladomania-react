import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
  getAllChefs,
  getUnassignedOrders,
  assignOrderToChef
} from '../../services/AdminServices';

const ManageOrders = () => {
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
    const chefId = selectedChef[orderId];
    if (!chefId) return;

    try {
      await assignOrderToChef(orderId, chefId);
      setOrders(orders.filter(order => order._id !== orderId)); // remove assigned order
      const updatedChefs = await getAllChefs(); // refresh chefs' statuses
      setChefs(updatedChefs);
    } catch (err) {
      console.error('Failed to assign order:', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Unassigned Orders
      </Typography>
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

export default ManageOrders;