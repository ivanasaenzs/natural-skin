import React from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCart } from "../../hooks/useCart";

export const Checkout = () => {
  const { cartItems, calculateTotal } = useCart();
  const total = calculateTotal();

  console.log("productos del carrito:", cartItems);
  console.log("total a pagar:", total);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      <List>
        {cartItems.map((item) => (
          <Box key={item.id}>
            <ListItem>
              <img
                src={item.productImage}
                alt={item.productName}
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "16px",
                  borderRadius: "8px",
                }}
              />
              <ListItemText
                primary={`${item.productName} x ${item.quantity}`}
                secondary={`Price: $${item.productPrice.toFixed(2)}`}
              />
            </ListItem>

            <Divider />
          </Box>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          width: "165px",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "green",
          },
        }}
      >
        Confirm Order
      </Button>
    </Box>
  );
};
