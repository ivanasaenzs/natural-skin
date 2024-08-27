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

import { IoMdCloseCircle } from "react-icons/io";

export default function ShoppingCartDrawer({ isOpen, toggleDrawer }) {
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
        <List>
          <ListItem>
            <ListItemText
              primary={`Product 1 x Quantity`}
              secondary={`$Subtotal`}
            />
          </ListItem>
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
          <Typography variant="subtitle1">$Total</Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth>
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
}
