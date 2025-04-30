import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // to get orderId from URL if necessary
import { CircularProgress, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { viewOrder } from '../../services/OrderServices'; // Import your service method

const ViewOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams(); // This assumes you're passing the orderId in the URL

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await viewOrder(orderId); // Assuming orderId is passed as a URL parameter
        setOrder(data.data); // Set order data from API response
        setLoading(false); // Turn off loading
      } catch (err) {
        setError('Failed to retrieve order data. Please try again later.');
        setLoading(false); // Turn off loading
      }
    };

    fetchOrder();
  }, [orderId]); // Rerun if orderId changes

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6">No order found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Order Details
          </Typography>

          <Typography variant="body1">
            <strong>Order ID:</strong> {order._id}
          </Typography>
          <Typography variant="body1">
            <strong>Salad:</strong> {order.salad_id.name}
          </Typography>
          <Typography variant="body1">
            <strong>Quantity:</strong> {order.quantity}
          </Typography>
          <Typography variant="body1">
            <strong>Total Price:</strong> ${order.total_price}
          </Typography>
          <Typography variant="body1">
            <strong>Customizations:</strong> {order.customizations}
          </Typography>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              Back to Orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewOrder;