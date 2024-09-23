import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const ProductCard = ({ productName, productImage, id }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia>
        <img
          style={{ width: "100%", height: 260, objectFit: "cover" }}
          src={productImage}
          alt={productName}
          title={productName}
        />
      </CardMedia>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          textAlign="center"
          sx={{
            fontSize: "1.25rem",
          }}
        >
          {productName}
        </Typography>
      </CardContent>

      <Button
        component={Link}
        to={`/detail/${id}`}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#f58549",
          "&:hover": {
            backgroundColor: "#fec89a",
          },
        }}
      >
        More Details
      </Button>
    </Card>
  );
};
