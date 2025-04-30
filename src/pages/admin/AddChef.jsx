// src/components/AddChef.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const AddChef = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workStatus, setWorkStatus] = useState('available');
  const [error, setError] = useState('');

  const handleAddChef = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newChef = { name, email, password, workStatus };
      // Make a POST request to the backend to add the chef
      await axios.post('/admin/addchef', newChef); // Ensure the endpoint matches your route
      setName('');
      setEmail('');
      setPassword('');
      setWorkStatus('available');
      setError('');
      alert('Chef added successfully!');
    } catch (error) {
      console.error('Error adding chef:', error);
      setError('Failed to add chef');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Add a New Chef</Typography>
      <form onSubmit={handleAddChef}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          type="password"
          required
        />
        <TextField
          fullWidth
          label="Availability"
          select
          value={workStatus}
          onChange={(e) => setWorkStatus(e.target.value)}
          margin="normal"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Chef
        </Button>
      </form>
    </Box>
  );
};

export default AddChef;