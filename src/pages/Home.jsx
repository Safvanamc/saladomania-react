import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { listSalads } from '../services/SaladServices'; // Correct import

const Home = () => {
  const [salads, setSalads] = useState([]);
  const [error, setError] = useState('');

  // Fetch salads from API on component mount
  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const fetchedSalads = await listSalads(); // Correct function call
        setSalads(fetchedSalads);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch salads.');
      }
    };

    fetchSalads();
  }, []);

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
                <img src={salad.image} alt={salad.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
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
                    <Button variant="contained" color="primary" onClick={() => alert('Order functionality to be added')}>
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
            Welcome to Saladomania, where we serve the freshest and most delicious salads tailored to your taste.
            We offer a variety of salads made with fresh veggies, dressings, and plenty of tasty add-ons. Whether
            you're looking for a quick and healthy lunch or a satisfying meal, Saladomania has something for everyone.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to make healthy eating fun and easy. We believe that food should not only be nutritious
            but also enjoyable. That's why we give you the ability to customize your salad with your favorite
            ingredients and toppings. We care about quality, so we only use the best, freshest ingredients.
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