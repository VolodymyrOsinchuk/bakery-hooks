import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongRounded from "@mui/icons-material/ReceiptLongRounded";

import SummaryRow from "./SummaryRow";
import { euro } from "../utils/format";

const METHODS = [
  { value: "card", label: "Carte", icon: <CreditCardRounded /> },
  { value: "cash", label: "Espèces", icon: <PaymentsOutlined /> },
  { value: "check", label: "Chèque", icon: <ReceiptLongRounded /> },
];

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
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    toast.info("Traitement du paiement...");

    setTimeout(() => {
      setProcessing(false);
      setPaymentDone(true);
      toast.success("Paiement accepté !");

      setTimeout(onPaymentSuccess, 2500);
    }, 1200);
  };

  if (paymentDone) {
    const method = METHODS.find((m) => m.value === paymentMethod);

    return (
      <Box sx={{ maxWidth: 480, mx: "auto", py: 4, textAlign: "center" }}>
        <CheckCircleRounded color="success" sx={{ fontSize: 72 }} />

        <Typography variant="h4" sx={{ mt: 1 }}>
          Paiement accepté
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Merci pour votre achat ! Réglé par {method.label.toLowerCase()}.
        </Typography>

        <Typography
          variant="h5"
          sx={{ mt: 3, fontVariantNumeric: "tabular-nums" }}
        >
          {euro.format(totalTTC)}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ maxWidth: 560, mx: "auto", p: { xs: 2.5, md: 4 }, borderRadius: 3 }}
    >
      <Typography variant="h5" component="h2">
        Paiement
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Vérifiez la commande, puis choisissez le moyen de paiement.
      </Typography>

      {/* RÉSUMÉ */}
      <Stack spacing={1}>
        {basket.map((item) => (
          <SummaryRow
            key={item.id}
            label={`${item.name} × ${item.quantity}`}
            value={euro.format(Number(item.price) * item.quantity)}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={0.75}>
        <SummaryRow label="Total HT" value={euro.format(totalHT)} />
        <SummaryRow label="Éco-taxe" value={euro.format(ecoTax)} />
        <SummaryRow label="TVA" value={euro.format(vat)} />
        <Divider sx={{ my: 1 }} />
        <SummaryRow strong label="Total TTC" value={euro.format(totalTTC)} />
      </Stack>

      {/* MOYEN DE PAIEMENT */}
      <Typography sx={{ mt: 4, mb: 1.5, fontWeight: 600 }}>
        Moyen de paiement
      </Typography>

      <ToggleButtonGroup
        exclusive
        fullWidth
        value={paymentMethod}
        disabled={processing}
        onChange={(_, value) => value && setPaymentMethod(value)}
        aria-label="Moyen de paiement"
        sx={{ gap: 1.5 }}
      >
        {METHODS.map((method) => (
          <ToggleButton
            key={method.value}
            value={method.value}
            sx={{
              flexDirection: "column",
              gap: 0.5,
              py: 1.5,
              borderRadius: "12px !important",
              border: "1px solid !important",
              borderColor: "divider !important",
              "&.Mui-selected": {
                bgcolor: "rgba(59, 42, 92, 0.08)",
                color: "primary.main",
                borderColor: "primary.main !important",
              },
            }}
          >
            {method.icon}
            {method.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* ACTIONS */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          disabled={processing}
          onClick={onCancel}
          sx={{ height: 52 }}
        >
          Retour
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          disabled={processing}
          onClick={handlePayment}
          sx={{ height: 52 }}
        >
          {processing ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            `Payer ${euro.format(totalTTC)}`
          )}
        </Button>
      </Stack>
    </Paper>
  );
}
