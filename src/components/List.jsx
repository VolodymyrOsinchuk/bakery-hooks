import React from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export default function List({ listItems, deleteItem }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 500, mx: 'auto', bgcolor: '#e0f3f3' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price €</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map((row, index) => {
            const { name, price } = row
            return (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell>{price} €</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      deleteItem(index)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
