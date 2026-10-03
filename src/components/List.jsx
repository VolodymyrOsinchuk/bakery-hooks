// components/List.jsx

import { Button, Typography } from "@mui/material";

import { Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function List({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 700,
          mx: "auto",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Aucun produit dans la liste.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Ajoutez votre premier produit depuis l'onglet « Ajouter ».
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 700,
        mx: "auto",
        bgcolor: "#e0f3f3",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>

              <TableCell>{Number(item.price).toFixed(2)} €</TableCell>

              <TableCell align="right">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => onDelete(item.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
