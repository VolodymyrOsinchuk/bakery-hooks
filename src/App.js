import React, { useState } from 'react'
import { ButtonGroup, Box, Container, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import ButtonMat from './components/ButtonMat'
import Add from './components/Add'
import List from './components/List'
import Pay from './components/Pay'

const names = ['add', 'list', 'pay']

function App() {
  const [items, setItems] = useState([])
  const [activeTab, setActiveTab] = useState(names[0])

  const add = (name, price) => {
    if (!name) return // Évite d'ajouter des éléments sans nom

    const obj = {
      name: name,
      price: price,
    }

    // Crée un nouveau tableau plutôt que de modifier le tableau existant
    const newItems = [...items, obj]
    setItems(newItems)
  }

  const deleteList = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <Add addItem={add} />
      case 'list':
        return <List listItems={items} deleteItem={deleteList} />
      case 'pay':
        return <Pay items={items} />
      default:
        return null
    }
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Bakery Manager
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Box display="flex" justifyContent="center">
                <ButtonGroup aria-label="navigation buttons">
                  {names.map((name) => (
                    <ButtonMat
                      key={name}
                      onClick={() => setActiveTab(name)}
                      isSelected={activeTab === name}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </ButtonMat>
                  ))}
                </ButtonGroup>
              </Box>
            </Grid>

            <Grid size={12}>{renderContent()}</Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default App
