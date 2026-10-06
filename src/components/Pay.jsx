import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

import SimpleCard from "./Card";
import Payment from "./Payment";
import SummaryRow from "./SummaryRow";
import { euro } from "../utils/format";

const ECO_TAX_PER_ITEM = 0.03;
const VAT_RATE = 0.2;

export default function Pay({ items, onPaymentComplete }) {
  const [basket, setBasket] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Ajouter un produit (ou +1 s'il est déjà dans le panier)
  const handleSelect = (item) => {
    const existingItem = basket.find((basketItem) => basketItem.id === item.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;

      setBasket((current) =>
        current.map((basketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: newQuantity }
            : basketItem,
        ),
      );

      toast.info(`${item.name} : quantité ${newQuantity}.`);
      return;
    }

    setBasket((current) => [...current, { ...item, quantity: 1 }]);
    toast.success(`${item.name} ajouté au panier.`);
  };

  const increaseQuantity = (id) => {
    const item = basket.find((basketItem) => basketItem.id === id);

    if (item) {
      handleSelect(item);
    }
  };

  const decreaseQuantity = (id) => {
    const item = basket.find((basketItem) => basketItem.id === id);

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      setBasket((current) =>
        current.filter((basketItem) => basketItem.id !== id),
      );
      toast.info(`${item.name} a été retiré du panier.`);
      return;
    }

    const newQuantity = item.quantity - 1;

    setBasket((current) =>
      current.map((basketItem) =>
        basketItem.id === id
          ? { ...basketItem, quantity: newQuantity }
          : basketItem,
      ),
    );

    toast.info(`${item.name} : quantité ${newQuantity}.`);
  };

  const removeItem = (id) => {
    const item = basket.find((basketItem) => basketItem.id === id);

    if (!item) {
      return;
    }

    setBasket((current) =>
      current.filter((basketItem) => basketItem.id !== id),
    );
    toast.warning(`${item.name} a été supprimé du panier.`);
  };

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

  const calculations = useMemo(() => {
    const totalHT = basket.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
    const quantity = basket.reduce((total, item) => total + item.quantity, 0);
    const ecoTax = quantity * ECO_TAX_PER_ITEM;
    const vat = totalHT * VAT_RATE;
    const totalTTC = totalHT + ecoTax + vat;

    return { totalHT, quantity, ecoTax, vat, totalTTC };
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

  if (items.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6">Aucun produit à vendre</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Ajoutez des produits depuis l'onglet « Ajouter » pour ouvrir la
          caisse.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* PRODUITS */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Produits
        </Typography>

        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} size={{ xs: 6, sm: 4, md: 6 }}>
              <SimpleCard item={item} onSelect={handleSelect} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* PANIER */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            borderRadius: 3,
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, alignItems: "center" }}
          >
            <ShoppingBagOutlined color="primary" />
            <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
              Panier
            </Typography>
            {basket.length > 0 && (
              <Chip
                size="small"
                color="primary"
                label={calculations.quantity}
              />
            )}
          </Stack>

          {basket.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3 }}>
              Touchez un produit pour l'ajouter.
            </Typography>
          ) : (
            <>
              {basket.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {euro.format(Number(item.price) * item.quantity)}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    sx={{
                      mt: 0.5,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {euro.format(Number(item.price))} / unité
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 99,
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          aria-label={`Retirer un ${item.name}`}
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 24,
                            textAlign: "center",
                            fontWeight: 600,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          aria-label={`Ajouter un ${item.name}`}
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>

                      <IconButton
                        size="small"
                        color="error"
                        aria-label={`Supprimer ${item.name} du panier`}
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              ))}

              <Stack spacing={0.75} sx={{ mt: 2 }}>
                <SummaryRow
                  label="Total HT"
                  value={euro.format(calculations.totalHT)}
                />
                <SummaryRow
                  label="Éco-taxe"
                  value={euro.format(calculations.ecoTax)}
                />
                <SummaryRow
                  label={`TVA (${VAT_RATE * 100} %)`}
                  value={euro.format(calculations.vat)}
                />
                <Divider sx={{ my: 1 }} />
                <SummaryRow
                  strong
                  label="Total TTC"
                  value={euro.format(calculations.totalTTC)}
                />
              </Stack>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{ mt: 3, height: 52 }}
                onClick={handleStartPayment}
              >
                Procéder au paiement
              </Button>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
