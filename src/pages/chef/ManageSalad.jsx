import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { listSalads } from '../../services/SaladServices';
import { useNavigate } from 'react-router-dom'; // Needed for navigation

const Home = () => {
  const [salads, setSalads] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock: Get user role (in real app, replace this with real authentication logic)
  const user = JSON.parse(localStorage.getItem('user')); // Ensure this object has a 'role' property

  useEffect(() => {
    if (user?.role === 'chef') {
      navigate('/chef'); // Redirect to chef page
      return;
    }

    const fetchSalads = async () => {
      try {
        const fetchedSalads = await listSalads();
        setSalads(fetchedSalads);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch salads.');
      }
    };

    fetchSalads();
  }, [user, navigate]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" mb={3}>
          Our Fresh Salads
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <Grid container spacing={4}>
          {salads.map((salad) => (
            <Grid item xs={12} sm={6} md={4} key={salad._id}>
              <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
                <img
                  src={salad.image}
                  alt={salad.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {salad.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${salad.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Add-ons: {salad.addOns.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Veggies: {salad.veggies.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Dressings: {salad.dressings.join(', ')}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => alert('Order functionality to be added')}
                    >
                      Order Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* About Section */}
        <Box sx={{ mt: 8, p: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h5" align="center" mb={3}>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Saladomania, where we serve the freshest and most delicious salads tailored to your taste...
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to make healthy eating fun and easy...
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for choosing Saladomania, and we look forward to serving you the best salads in town!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
