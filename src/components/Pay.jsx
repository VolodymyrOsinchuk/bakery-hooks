import { useMemo, useState } from "react";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import SimpleCard from "./Card";
import Payment from "./Payment";

const ECO_TAX_PER_ITEM = 0.03;
const VAT_RATE = 0.2;

export default function Pay({ items, onPaymentComplete }) {
  const [basket, setBasket] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Ajouter un produit
  const handleSelect = (item) => {
    const existingItem = basket.find((basketItem) => basketItem.id === item.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;

      setBasket((currentBasket) =>
        currentBasket.map((basketItem) =>
          basketItem.id === item.id
            ? {
                ...basketItem,
                quantity: newQuantity,
              }
            : basketItem,
        ),
      );

      toast.info(`${item.name} : quantité ${newQuantity}.`);

      return;
    }

    setBasket((currentBasket) => [
      ...currentBasket,
      {
        ...item,
        quantity: 1,
      },
    ]);

    toast.success(`${item.name} ajouté au panier.`);
  };

  // Augmenter
  const increaseQuantity = (id) => {
    const item = basket.find((item) => item.id === id);

    if (!item) {
      return;
    }

    const newQuantity = item.quantity + 1;

    setBasket((currentBasket) =>
      currentBasket.map((basketItem) =>
        basketItem.id === id
          ? {
              ...basketItem,
              quantity: newQuantity,
            }
          : basketItem,
      ),
    );

    toast.info(`${item.name} : quantité ${newQuantity}.`);
  };

  // Diminuer
  const decreaseQuantity = (id) => {
    const item = basket.find((item) => item.id === id);

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      setBasket((currentBasket) =>
        currentBasket.filter((basketItem) => basketItem.id !== id),
      );

      toast.info(`${item.name} a été retiré du panier.`);

      return;
    }

    const newQuantity = item.quantity - 1;

    setBasket((currentBasket) =>
      currentBasket.map((basketItem) =>
        basketItem.id === id
          ? {
              ...basketItem,
              quantity: newQuantity,
            }
          : basketItem,
      ),
    );

    toast.info(`${item.name} : quantité ${newQuantity}.`);
  };

  // Supprimer complètement
  const removeItem = (id) => {
    const item = basket.find((basketItem) => basketItem.id === id);

    if (!item) {
      return;
    }

    setBasket((currentBasket) =>
      currentBasket.filter((basketItem) => basketItem.id !== id),
    );

    toast.warning(`${item.name} a été supprimé du panier.`);
  };

  // Bouton "Procéder au paiement"
  const handleStartPayment = () => {
    if (basket.length === 0) {
      toast.warning("Votre panier est vide. Ajoutez au moins un produit.");

      return;
    }

    toast.success("Commande prête pour le paiement.");

    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setBasket([]);
    onPaymentComplete();
    setShowPayment(false);
  };

  // Calculs
  const calculations = useMemo(() => {
    const totalHT = basket.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );

    const quantity = basket.reduce((total, item) => total + item.quantity, 0);

    const ecoTax = quantity * ECO_TAX_PER_ITEM;

    const vat = totalHT * VAT_RATE;

    const totalTTC = totalHT + ecoTax + vat;

    return {
      totalHT,
      quantity,
      ecoTax,
      vat,
      totalTTC,
    };
  }, [basket]);

  if (showPayment) {
    return (
      <Payment
        basket={basket}
        totalHT={calculations.totalHT}
        ecoTax={calculations.ecoTax}
        vat={calculations.vat}
        totalTTC={calculations.totalTTC}
        onCancel={() => setShowPayment(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* PRODUITS */}
      <Typography variant="h5" gutterBottom>
        Sélectionnez vos produits
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <SimpleCard item={item} onSelect={handleSelect} />
          </Grid>
        ))}
      </Grid>

      {/* PANIER */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 4,
          maxWidth: 650,
        }}
      >
        <Typography variant="h6" gutterBottom>
          🛒 Votre panier
        </Typography>

        {basket.length === 0 ? (
          <Typography color="text.secondary">
            Aucun produit sélectionné.
          </Typography>
        ) : (
          basket.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* NOM + PRIX */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold">{item.name}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {Number(item.price).toFixed(2)} € / unité
                </Typography>
              </Box>

              {/* QUANTITÉ */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <RemoveIcon />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 30,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item.quantity}
                </Typography>

                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* TOTAL PRODUIT */}
              <Typography
                sx={{
                  minWidth: 80,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {(Number(item.price) * item.quantity).toFixed(2)} €
              </Typography>

              {/* SUPPRIMER */}
              <IconButton color="error" onClick={() => removeItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}

        {/* CALCULS */}
        {basket.length > 0 && (
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: "2px solid",
              borderColor: "divider",
            }}
          >
            <Typography>Quantité : {calculations.quantity}</Typography>

            <Typography>
              Total HT : {calculations.totalHT.toFixed(2)} €
            </Typography>

            <Typography>
              Éco-taxe : {calculations.ecoTax.toFixed(2)} €
            </Typography>

            <Typography>
              TVA (20 %) : {calculations.vat.toFixed(2)} €
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mt: 2,
                fontWeight: "bold",
              }}
            >
              Total TTC : {calculations.totalTTC.toFixed(2)} €
            </Typography>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleStartPayment}
            >
              Procéder au paiement
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
