import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";

import imageUrl from "../images/item.png";
import { euro } from "../utils/format";

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

export default function SimpleCard({ item, onSelect }) {
  const [image, setImage] = useState(imageUrl);
  const isFallback = image === imageUrl;

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      if (!UNSPLASH_ACCESS_KEY) {
        console.warn("REACT_APP_UNSPLASH_API_KEY est absente.");
        return;
      }

      if (!item?.name?.trim()) {
        return;
      }

      try {
        const params = new URLSearchParams({
          query: item.name,
          page: "1",
          per_page: "1",
          client_id: UNSPLASH_ACCESS_KEY,
        });

        const response = await fetch(
          `https://api.unsplash.com/search/photos?${params}`,
        );

        if (!response.ok) {
          throw new Error(`Unsplash API : ${response.status}`);
        }

        const data = await response.json();

        if (cancelled) {
          return;
        }

        const firstImage = data.results?.[0];

        setImage(firstImage?.urls?.small ?? imageUrl);
      } catch (error) {
        if (!cancelled) {
          console.error("Erreur lors du chargement de l'image :", error);
          setImage(imageUrl);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [item?.name]);

  return (
    <Card
      sx={{
        height: "100%",
        transition:
          "transform .15s ease, border-color .15s ease, box-shadow .15s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "secondary.main",
          boxShadow: "0 14px 30px -18px rgba(42, 29, 68, 0.5)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(item)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ position: "relative", bgcolor: "background.default" }}>
          <CardMedia
            component="img"
            height="150"
            image={image}
            alt={item.name}
            sx={{
              objectFit: isFallback ? "contain" : "cover",
              p: isFallback ? 2 : 0,
            }}
          />

          <Chip
            size="small"
            color="secondary"
            label={euro.format(Number(item.price))}
            sx={{
              position: "absolute",
              right: 10,
              bottom: 10,
              fontWeight: 700,
            }}
          />
        </Box>

        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            py: 1.5,
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            noWrap
            sx={{ fontWeight: 600, minWidth: 0 }}
          >
            {item.name}
          </Typography>

          <AddCircleRounded color="primary" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
