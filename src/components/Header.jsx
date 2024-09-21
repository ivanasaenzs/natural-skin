import React, { useState, useEffect } from "react";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { CiUser, CiShoppingCart } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useCart } from "../hooks/useCart";

function Header({ toggleCart }) {
  const [menuSignoutButton, setMenuSignoutButton] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const { cartItems } = useCart();

  // Track authentication state to check if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handles the opening of "menu" (sign out option)
  const handleMenuOpen = (e) => {
    console.log(e.currentTarget);
    setMenuSignoutButton(e.currentTarget);
  };

  // Handles the closing of "menu" (sign out option)
  const handleMenuClose = () => {
    setMenuSignoutButton(null);
  };

  // Handles logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("usuario cerró sesión correctamente");
        navigate("/login");
      })
      .catch((error) => {
        console.error("error al cerrar sesión: ", error);
      });
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0079C4" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Button component={Link} to="/">
              <Typography sx={{ minWidth: 100, color: "#fff" }}>
                Home
              </Typography>
            </Button>
            <Button component={Link} to="/products">
              <Typography sx={{ minWidth: 100, color: "#fff" }}>
                Products
              </Typography>
            </Button>
          </Box>

          {/* Title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: 1,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              top: "50%",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              noWrap
              component="div"
              sx={{
                fontSize: "1.5rem",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              natural skin
            </Typography>
            <Typography component="span" align="center">
              skincare & wellness
            </Typography>
          </Box>
          {/* User icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              minWidth: "100px",
              flexGrow: 1,
            }}
          >
            <Button
              onClick={user ? handleMenuOpen : () => navigate("/login")}
              sx={{ padding: "1px", minWidth: "auto" }}
            >
              <CiUser
                size="24"
                style={{
                  marginRight: "10px",
                  color: "#fff",
                }}
              />
            </Button>
            <Menu
              anchorEl={menuSignoutButton}
              open={Boolean(menuSignoutButton)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {user && <MenuItem onClick={handleLogout}>Sign Out</MenuItem>}
            </Menu>
            {/* Cart icon renders badge with number of products inside of cart/doesn't render badge when cart is empty */}
            <Button
              onClick={toggleCart}
              sx={{ padding: "1px", minWidth: "auto" }}
            >
              <Badge
                badgeContent={cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                color="error"
              >
                <CiShoppingCart size="24" style={{ color: "#fff" }} />
              </Badge>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
