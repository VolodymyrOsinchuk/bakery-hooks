import React, { useState } from 'react'
import { Button, Slider, TextField, Typography } from '@mui/material'

export default function Add({ addItem }) {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(1)

  const updateItemName = (event) => {
    setProductName(event.target.value)
  }

  const updatePrice = (event, newPrice) => {
    setPrice(newPrice)
  }

  const click = () => {
    addItem(productName, price)
  }

  return (
    <div>
      <form>
        <TextField
          variant="outlined"
          onChange={updateItemName}
          value={productName}
          placeholder="Nom du produit"
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={click}
          sx={{ height: 55 }}
        >
          Add
        </Button>
      </form>
      <Typography sx={{ my: 2 }}>{price} €</Typography>
      <Slider
        value={price}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        marks={true}
        sx={{ width: 500 }}
        onChange={updatePrice}
      />
    </div>
  )
}
