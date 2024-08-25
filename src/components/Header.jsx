import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import SearchBar from "./Searchbar";

import { CiUser, CiShoppingCart } from "react-icons/ci";

function Header() {
  return (
    <AppBar position="static">
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
          {/* Search Bar */}
          {/* <Box sx={{ display: "flex", flexGrow: 1, minWidth: "200px" }}>
            <SearchBar />
          </Box> */}
          <Box>
            <Button>
              <Typography sx={{ minWidth: 100, color: "#fff" }}>
               Home
              </Typography>
            </Button>
            <Button>
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
              component="a"
              href="/account/login"
              sx={{ padding: "1px", minWidth: "auto" }}
            >
              <CiUser
                size={24}
                style={{
                  marginRight: "10px",
                  color: "#fff",
                }}
              />
            </Button>
            <Button
              component="a"
              href="#"
              sx={{ padding: "1px", minWidth: "auto" }}
            >
              <CiShoppingCart size={24} style={{ color: "#fff" }} />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
