import {
  Box,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";

import { euro } from "../utils/format";

export default function List({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center", maxWidth: 420, mx: "auto" }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: "auto",
            mb: 2,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "background.default",
            color: "primary.main",
          }}
        >
          <Inventory2Outlined fontSize="large" />
        </Box>

        <Typography variant="h6">Aucun produit pour le moment</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Ajoutez votre premier produit depuis l'onglet « Ajouter ».
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: "center" }}>
        <Typography variant="h5" component="h2">
          Catalogue
        </Typography>
        <Chip size="small" label={items.length} color="primary" />
      </Stack>

      <TableContainer
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Prix</TableCell>
              <TableCell align="right" width={64} />
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>

                <TableCell
                  align="right"
                  sx={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {euro.format(Number(item.price))}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Supprimer">
                    <IconButton
                      color="error"
                      size="small"
                      aria-label={`Supprimer ${item.name}`}
                      onClick={() => onDelete(item.id)}
                    >
                      <DeleteOutlineRounded />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
