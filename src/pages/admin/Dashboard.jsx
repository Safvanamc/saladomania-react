import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/managechef"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
          >
            Manage Chefs
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/manageorders"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
          >
            Manage Orders
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/addchef"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
          >
            Add Chef
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;