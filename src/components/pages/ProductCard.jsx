import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

export const ProductCard = ({ productName, productImage, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 340 }} image={productImage} title="Product" />
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
