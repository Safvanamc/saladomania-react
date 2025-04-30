import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Box, Typography } from '@mui/material';
import { listSalads } from '../../services/SaladServices'; // Make sure this is your correct import path

const CustomizationForm = ({ salad_id, onSubmit }) => {  
  const [customizations, setCustomizations] = useState({ veggies: [], dressings: [], addOns: [] });
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Fetch available salad ingredients when the component mounts
  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const salads = await listSalads(); // Fetch available salads and ingredients
        const salad = salads.find((s) => s._id === salad_id);
        if (salad) {
          setAvailableIngredients(salad.veggies.concat(salad.dressings, salad.add_ons)); // Concatenate all ingredients
        }
      } catch (err) {
        console.error('Failed to load ingredients', err);
      }
    };
    fetchSalads();
  }, [salad_id]);

  // Handle checkbox selection for custom ingredients
  const handleCheckboxChange = (ingredient, type) => {
    setCustomizations((prevCustomizations) => {
      const updatedCustomizations = { ...prevCustomizations };
      if (updatedCustomizations[type].includes(ingredient._id)) {
        updatedCustomizations[type] = updatedCustomizations[type].filter(item => item !== ingredient._id);
      } else {
        updatedCustomizations[type].push(ingredient._id);
      }
      return updatedCustomizations;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customizations, quantity }); // Passing customizations and quantity to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Customize Your Salad
      </Typography>
      <FormGroup>
        {availableIngredients.map((ingredient) => (
          <div key={ingredient._id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={customizations.veggies.includes(ingredient._id) || customizations.dressings.includes(ingredient._id) || customizations.addOns.includes(ingredient._id)}
                  onChange={() => handleCheckboxChange(ingredient, ingredient.type)}
                  name={ingredient.name}
                />
              }
              label={ingredient.name}
            />
          </div>
        ))}
      </FormGroup>

      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Place Order
        </Button>
      </Box>
    </form>
  );
};

export default CustomizationForm;