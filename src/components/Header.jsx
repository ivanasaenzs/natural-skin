import React from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";


import { Link } from "react-router-dom";

import { CiUser, CiShoppingCart } from "react-icons/ci";

function Header({ toggleCart }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3a6ea5" }}>
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

          {/* User and Cart Icons */}
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
              component={Link}
              to="/login"
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
            <Button
              onClick={toggleCart}
              sx={{ padding: "1px", minWidth: "auto" }}
            >
              <CiShoppingCart size="24" style={{ color: "#fff" }} />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
