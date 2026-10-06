import { createTheme } from "@mui/material/styles";

const LINE = "rgba(59, 42, 92, 0.12)";

const theme = createTheme({
  palette: {
    primary: { main: "#3B2A5C" }, // myrtille
    secondary: { main: "#E8A33D", contrastText: "#2A1D44" }, // croûte dorée
    success: { main: "#2F7D5B" },
    error: { main: "#C8454B" },
    background: { default: "#F5F3F8", paper: "#FFFFFF" },
    text: { primary: "#1F1630", secondary: "#6B6280" },
    divider: LINE,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: "#fff" },
        notchedOutline: { borderColor: LINE },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${LINE}`, borderRadius: 16 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: LINE, padding: "14px 16px" },
        head: {
          fontWeight: 600,
          color: "#6B6280",
          backgroundColor: "#FBFAFD",
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
  },
});

export default theme;
