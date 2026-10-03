import { useState } from "react";
import { Box, ButtonGroup, Container, Paper, Typography } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Add from "./components/Add";
import ButtonMat from "./components/ButtonMat";
import List from "./components/List";
import Pay from "./components/Pay";

const TABS = [
  { id: "add", label: "Ajouter" },
  { id: "list", label: "Liste" },
  { id: "pay", label: "Paiement" },
];

function App() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const clearItems = () => {
    setItems([]);
  };
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

    const newItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      price: numericPrice,
    };

    setItems((currentItems) => [...currentItems, newItem]);

    toast.success(`"${trimmedName}" a été ajouté.`);

    return true;
  };

  const deleteItem = (id) => {
    const item = items.find((item) => item.id === id);

    if (!item) {
      return;
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));

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
    <>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h4" component="h1" align="center" sx={{ mb: 4 }}>
            Bakery Manager
          </Typography>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ButtonGroup aria-label="Navigation principale">
              {TABS.map((tab) => (
                <ButtonMat
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  isSelected={activeTab === tab.id}
                >
                  {tab.label}
                </ButtonMat>
              ))}
            </ButtonGroup>
          </Box>

          {renderContent()}
        </Paper>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
