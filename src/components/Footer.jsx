import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f1f8e9',
        py: 2,
        textAlign: 'center',
        marginTop: 'auto'
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Saladomania. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;