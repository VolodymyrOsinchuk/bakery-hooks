import { useState, useEffect } from 'react'
import { Card, CardMedia, CardActionArea } from '@mui/material'
import { createApi } from 'unsplash-js'
import imageUrl from '../images/item.png'
const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY

// Remplace avec ta clé API Unsplash
const unsplash = createApi({
  accessKey: apiKey,
})

export default function SimpleCard({ itemName, price, onClick }) {
  const [image, setImage] = useState(imageUrl)

  // Fonction pour récupérer l'image d'Unsplash
  useEffect(() => {
    const loadImage = async () => {
      try {
        const { response } = await unsplash.search.getPhotos({
          query: `${itemName}`,
          page: 1,
          perPage: 10,
        })

        if (response.results.length > 0) {
          // Si une image correspondante est trouvée, utiliser l'URL de la première image
          setImage(response.results[0].urls.small)
        } else {
          // Si aucune image n'est trouvée, utiliser l'image par défaut
          setImage(imageUrl)
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'image:", error)
        setImage(imageUrl) // Si une erreur se produit, utiliser l'image par défaut
      }
    }

    loadImage()
  }, [itemName]) // Le hook se déclenche à chaque changement de itemName

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea onClick={() => onClick(itemName, price)}>
        <CardMedia
          component="img"
          sx={{ width: 300, padding: 2 }}
          image={image}
          alt={itemName}
        />
      </CardActionArea>
    </Card>
  )
}
