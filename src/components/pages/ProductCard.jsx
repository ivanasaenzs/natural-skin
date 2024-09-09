import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetchImage } from "../../hooks/useFetchImage";

export const ProductCard = ({ productName, id, imagePath }) => {
  const { imageUrl } = useFetchImage(imagePath);

  console.log("URL traida de storage:", imageUrl);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productName}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      ) : (
        <div>Loading...</div>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="p" textAlign="center">
          {productName}
        </Typography>
        <Button
          component={Link}
          to={`/detail/${id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Product Details
        </Button>
      </CardContent>
    </Card>
  );
};
