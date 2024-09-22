import React, { useState, useEffect } from "react";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { IoMdCloseCircle } from "react-icons/io";

export default function ShoppingCartDrawer({ isOpen, toggleDrawer }) {
  const {
    cartItems,
    calculateSubtotal,
    calculateTotal,
    deleteCartItem,
    deleteCart,
  } = useCart();
  const [user, setUser] = useState();
  const isEmpty = cartItems.length === 0;
  const navigate = useNavigate();
  const auth = getAuth();

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Function to handle the checkout button click
  const handleCheckout = () => {
    if (user) {
      // redirige a página checkout
      navigate("/checkout");
      console.log("Redirigiendo a checkout...");
    } else {
      toggleDrawer(false);
      navigate("/login");
    }
  };

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
          <Box>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.productName} x ${item.quantity}`}
                    secondary={`$${calculateSubtotal(item).toFixed(2)}`}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => deleteCartItem(item.id)}
                    sx={{
                      minWidth: 0,
                      padding: 0,
                      margin: 0,
                      width: "24px",
                      height: "24px",
                      color: "#fff",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "red",
                        border: "1px solid red",
                      },
                    }}
                  >
                    X
                  </Button>
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{
                color: "#fff",
                backgroundColor: "#f58549",
                "&:hover": {
                  backgroundColor: "#fec89a",
                },
              }}
            >
              Checkout
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Button
                size="small"
                onClick={deleteCart}
                sx={{
                  color: "#000",
                }}
              >
                Empty Cart
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
