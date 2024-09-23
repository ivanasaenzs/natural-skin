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
  Alert, // Import Alert component to display the error
} from "@mui/material";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useCart } from "../hooks/useCart";

function Header({ toggleCart }) {
  const [menuSignoutButton, setMenuSignoutButton] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Keep the error message
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
        navigate("/login");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Failed to log out. Please try again.");
      });
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fec89a" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: { xs: "column", md: "row" },
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "10px", sm: "12px", md: "16px" },
            }}
          >
            {/* Title and subtitle */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                order: { xs: 1, md: 0 },
                flexGrow: 1,
                paddingBottom: { xs: "10px", md: "0" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  letterSpacing: ".2rem",
                }}
              >
                natural skin
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", md: "1rem" },
                }}
              >
                skincare & wellness
              </Typography>
            </Box>

            {/* Menu buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: "10px",
                order: { xs: 2, md: 0 },
              }}
            >
              <Button component={Link} to="/">
                <Typography
                  sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: "#fff" }}
                >
                  Home
                </Typography>
              </Button>
              <Button component={Link} to="/products">
                <Typography
                  sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: "#fff" }}
                >
                  Products
                </Typography>
              </Button>
            </Box>

            {/* User icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                order: { xs: 3, md: 0 },
                flexGrow: 1,
              }}
            >
              <Button
                onClick={user ? handleMenuOpen : () => navigate("/login")}
                sx={{ padding: "1px", minWidth: "auto" }}
              >
                <CiUser size="24" style={{ color: "#fff" }} />
              </Button>
              <Menu
                anchorEl={menuSignoutButton}
                open={Boolean(menuSignoutButton)}
                onClose={handleMenuClose}
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

      {errorMessage ? (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
