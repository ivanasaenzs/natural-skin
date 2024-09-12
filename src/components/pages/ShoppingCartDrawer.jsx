import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCart } from "../../hooks/useCart";

import { IoMdCloseCircle } from "react-icons/io";

export default function ShoppingCartDrawer({ isOpen, toggleDrawer }) {
  const { cartItems, calculateSubtotal, calculateTotal } = useCart();
  const isEmpty = cartItems.length === 0;

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 300, padding: 2 }}>
        {/* Close button container */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="text"
            color="inherit"
            onClick={toggleDrawer(false)}
            sx={{ minWidth: 0, padding: 0 }}
          >
            <IoMdCloseCircle size="24" />
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Your Shopping Cart
        </Typography>
        <Divider />
        {isEmpty ? (
          <Typography variant="body1" sx={{ padding: 2, textAlign: "center" }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.productName} x ${item.quantity}`}
                    secondary={`$${calculateSubtotal(item).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 2,
              }}
            >
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
            <Button size="small">Empty Cart</Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}

