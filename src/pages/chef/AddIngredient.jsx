import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddIngredient = () => {
  const navigate = useNavigate(); // using useNavigate hook
  const [ingredient, setIngredient] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient({ ...ingredient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/ingredients/add', ingredient, {
        headers: {
          'Authorization':` Bearer ${localStorage.getItem('token')}`
        }
     });

      if (response.data.status) {
        // Navigate to ingredients list page after successfully adding ingredient
        navigate('/ingredients');
      }
    } catch (err) {
      setError('Failed to add ingredient');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add New Ingredient
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={ingredient.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={ingredient.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          value={ingredient.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          name="image"
          value={ingredient.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Ingredient'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddIngredient;