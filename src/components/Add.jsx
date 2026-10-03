// components/Add.jsx

import { useState } from "react";
import { Box, Button, Slider, TextField, Typography } from "@mui/material";

const MIN_PRICE = 1;
const MAX_PRICE = 10;

export default function Add({ onAdd }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(MIN_PRICE);

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = onAdd(productName, price);

    if (success) {
      setProductName("");
      setPrice(MIN_PRICE);
    }
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Nom du produit"
          variant="outlined"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
          fullWidth
          sx={{ maxWidth: 400 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ height: 56 }}
        >
          Ajouter
        </Button>
      </Box>

      <Box sx={{ mt: 3, maxWidth: 500 }}>
        <Typography gutterBottom>
          Prix : <strong>{price.toFixed(2)} €</strong>
        </Typography>

        <Slider
          value={price}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={0.5}
          valueLabelDisplay="auto"
          marks
          onChange={(_, newPrice) => setPrice(newPrice)}
          aria-label="Prix du produit"
        />
      </Box>
    </Box>
  );
}
