import { Stack, Typography } from "@mui/material";

export default function SummaryRow({ label, value, strong = false }) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "baseline" }}
    >
      <Typography color={strong ? "text.primary" : "text.secondary"}>
        {label}
      </Typography>
      <Typography
        variant={strong ? "h6" : "body1"}
        sx={{
          fontVariantNumeric: "tabular-nums",
          fontWeight: strong ? 700 : 500,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
