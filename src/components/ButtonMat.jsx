// components/ButtonMat.jsx

import { Button } from "@mui/material";

export default function ButtonMat({ children, onClick, isSelected = false }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="contained"
      color={isSelected ? "primary" : "inherit"}
    >
      {children}
    </Button>
  );
}
