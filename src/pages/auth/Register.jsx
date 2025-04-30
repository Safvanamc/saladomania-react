import React, { useState, useContext } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { registerUser } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple password match validation
    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }

    try {
      const { token, user } = await registerUser({ name, email, password });
      login(token, user); // Pass token and user data to login
      navigate('/'); // Redirect to homepage after successful registration
    } catch (err) {
      console.error(err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" mb={3}>
          Create an Account
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;