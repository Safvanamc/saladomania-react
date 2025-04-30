import React, { useState, useContext } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext.jsx';
import { loginUser } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      login(userData); // context login
      navigate('/'); // redirect to homepage after login
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" mb={3}>
          Login to Saladomania
        </Typography>

        <form onSubmit={handleLogin}>
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
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;