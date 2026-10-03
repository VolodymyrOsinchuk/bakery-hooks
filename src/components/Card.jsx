import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import imageUrl from "../images/item.png";

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

export default function SimpleCard({ item, onSelect }) {
  const [image, setImage] = useState(imageUrl);

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

        if (firstImage?.urls?.small) {
          setImage(firstImage.urls.small);
        } else {
          setImage(imageUrl);
        }
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={() => onSelect(item)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* IMAGE */}
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={item.name}
          sx={{
            objectFit: "contain",
            p: 2,
          }}
        />

        {/* INFORMATIONS */}
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
          >
            {Number(item.price).toFixed(2)} €
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
