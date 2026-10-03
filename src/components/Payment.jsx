import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

export default function Payment({
  basket,
  totalHT,
  ecoTax,
  vat,
  totalTTC,
  onPaymentSuccess,
  onCancel,
}) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePayment = () => {
    toast.info("Traitement du paiement...");

    setPaymentDone(true);

    setTimeout(() => {
      toast.success("Paiement accepté !");

      onPaymentSuccess();
    }, 1500);
  };

  if (paymentDone) {
    return (
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="success.main" gutterBottom>
          ✓ Paiement accepté
        </Typography>

        <Typography sx={{ mb: 2 }}>Merci pour votre achat !</Typography>

        <Typography variant="h5">{totalTTC.toFixed(2)} €</Typography>

        <Alert severity="success" sx={{ mt: 3 }}>
          Votre commande a été enregistrée.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Paiement
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* RÉSUMÉ */}
      <Typography variant="h6" gutterBottom>
        Résumé de la commande
      </Typography>

      {basket.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography>
            {item.name} × {item.quantity}
          </Typography>

          <Typography>{(item.price * item.quantity).toFixed(2)} €</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography>Total HT : {totalHT.toFixed(2)} €</Typography>

        <Typography>Éco-taxe : {ecoTax.toFixed(2)} €</Typography>

        <Typography>TVA : {vat.toFixed(2)} €</Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          Total TTC : {totalTTC.toFixed(2)} €
        </Typography>
      </Box>

      {/* MOYEN DE PAIEMENT */}
      <FormControl sx={{ mt: 3 }}>
        <FormLabel>Moyen de paiement</FormLabel>

        <RadioGroup
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="💳 Carte bancaire"
          />

          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="💶 Espèces"
          />

          <FormControlLabel
            value="check"
            control={<Radio />}
            label="📝 Chèque"
          />
        </RadioGroup>
      </FormControl>

      {/* ACTIONS */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 4,
        }}
      >
        <Button variant="outlined" fullWidth onClick={onCancel}>
          Retour
        </Button>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handlePayment}
        >
          Payer {totalTTC.toFixed(2)} €
        </Button>
      </Box>
    </Paper>
  );
}
