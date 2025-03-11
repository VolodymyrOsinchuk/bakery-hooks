import React, { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import SimpleCard from './Card'

export default function Pay({ items }) {
  const [basket, setBasket] = useState([])
  const [total, setTotal] = useState(0)
  const [totalEcoTax, setTotalEcoTax] = useState(0)
  const [totalTVA, setTotalTVA] = useState(0)
  const [totalTTC, setTotalTTC] = useState(0)

  function handleSelect(name, price) {
    const itemSelected = {
      name,
      price,
    }

    const newBasket = [...basket, itemSelected]

    // Calculer la somme avec reduce
    const sum = newBasket.reduce((acc, item) => acc + item.price, 0)

    setBasket(newBasket)
    setTotal(sum)
    setTotalEcoTax(newBasket.length * 0.03)
    setTotalTVA((sum * 20) / 100)
    setTotalTTC(sum + newBasket.length * 0.03 + (sum * 20) / 100)
  }

  function itemCount(itemName) {
    return basket.filter((item) => item.name === itemName)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h5" gutterBottom>
            Sélectionnez vos produits
          </Typography>
        </Grid>

        <Grid size={12}>
          <Grid container spacing={2}>
            {items.map((item, index) => {
              const { name, price } = item
              return (
                <Grid key={index}>
                  <SimpleCard
                    itemName={name}
                    price={price}
                    onClick={handleSelect}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>

            {items
              .map((item, index) => {
                const lengthCount = itemCount(item.name).length
                if (lengthCount > 0) {
                  return (
                    <Typography key={index}>
                      {item.name} x {lengthCount}
                    </Typography>
                  )
                }
                return null
              })
              .filter((item) => item !== null)}

            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
              <Typography>Total: {total.toFixed(2)} €</Typography>
              <Typography>EcoTax: {totalEcoTax.toFixed(2)} €</Typography>
              <Typography>TVA: {totalTVA.toFixed(2)} €</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Total TTC: {totalTTC.toFixed(2)} €
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
