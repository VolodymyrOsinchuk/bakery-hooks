import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Container,
  CssBaseline,
  Paper,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import FormatListBulletedRounded from "@mui/icons-material/FormatListBulletedRounded";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import BakeryDiningRounded from "@mui/icons-material/BakeryDiningRounded";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Add from "./components/Add";
import List from "./components/List";
import Pay from "./components/Pay";
import theme from "./theme";
import { euro } from "./utils/format";

// Ajoutez dans index.html :
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

const TABS = [
  { id: "add", label: "Ajouter", icon: <AddCircleOutlineRounded /> },
  { id: "list", label: "Liste", icon: <FormatListBulletedRounded /> },
  { id: "pay", label: "Paiement", icon: <PaymentsOutlined /> },
];

function App() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  const clearItems = () => setItems([]);

  const addItem = (name, price) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.warning("Veuillez saisir un nom de produit.");
      return false;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.warning("Veuillez saisir un prix valide.");
      return false;
    }

    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), name: trimmedName, price: numericPrice },
    ]);

    toast.success(`"${trimmedName}" a été ajouté.`);
    return true;
  };

  const deleteItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setItems((current) => current.filter((i) => i.id !== id));
    toast.info(`"${item.name}" a été supprimé.`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return <Add onAdd={addItem} />;
      case "list":
        return <List items={items} onDelete={deleteItem} />;
      case "pay":
        return <Pay items={items} onPaymentComplete={clearItems} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* En-tête */}
      <Box
        component="header"
        sx={{
          background:
            "linear-gradient(135deg, #2A1D44 0%, #3B2A5C 60%, #4B3578 100%)",
          color: "#fff",
          pt: { xs: 4, md: 6 },
          pb: { xs: 9, md: 11 },
        }}
      >
        <Container maxWidth="md">
          <Stack
            spacing={3}
            sx={{
              direction: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
            }}
          >
            <Stack
              // direction="row" spacing={2} alignItems="center"
              sx={{
                direction: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "16px",
                  bgcolor: "secondary.main",
                  color: "primary.main",
                }}
              >
                <BakeryDiningRounded fontSize="large" />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    lineHeight: 1.1,
                  }}
                >
                  Bakery Manager
                </Typography>
                <Typography sx={{ opacity: 0.75, mt: 0.5 }}>
                  Catalogue, panier et encaissement
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Chip
                label={`${items.length} produit${items.length > 1 ? "s" : ""}`}
                sx={{
                  bgcolor: "rgba(255,255,255,0.14)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
              <Chip
                label={euro.format(total)}
                color="secondary"
                sx={{ fontWeight: 700, color: "primary.main" }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Contenu, remonté sur l'en-tête */}
      <Container maxWidth="md" sx={{ mt: { xs: -6, md: -7 }, pb: 8 }}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "rgba(59,42,92,0.08)",
            boxShadow: "0 20px 50px -20px rgba(42,29,68,0.35)",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            aria-label="Navigation principale"
            textColor="primary"
            indicatorColor="secondary"
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: "#FBFAFD",
              "& .MuiTab-root": { minHeight: 64, fontSize: "0.95rem" },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                iconPosition="start"
                icon={
                  tab.id === "list" ? (
                    <Badge
                      badgeContent={items.length}
                      color="secondary"
                      max={99}
                    >
                      {tab.icon}
                    </Badge>
                  ) : (
                    tab.icon
                  )
                }
                label={tab.label}
              />
            ))}
          </Tabs>

          <Box sx={{ p: { xs: 2.5, md: 4 } }}>{renderContent()}</Box>
        </Paper>
      </Container>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{ borderRadius: 12, fontFamily: "Inter, sans-serif" }}
      />
    </ThemeProvider>
  );
}

export default App;
