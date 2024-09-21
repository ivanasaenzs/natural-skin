import React from "react";
import { useNavigate } from "react-router-dom";
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
  const { cartItems, calculateTotal, confirmOrder } = useCart();
  const total = calculateTotal();
  const navigate = useNavigate();

  console.log("productos del carrito:", cartItems);
  console.log("total a pagar:", total);

  const handleConfirmOrder = async () => {
    await confirmOrder();
    navigate("/orders");
  };

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
      <Box sx={{ marginTop: "40px", marginBottom: "20px" }}>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      </Box>
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
        onClick={handleConfirmOrder}
      >
        Confirm Order
      </Button>
    </Box>
  );
};
