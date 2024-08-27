import React from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";

// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const LogIn = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={3}
        maxWidth="md"
        alignItems="center"
        sx={{
          border: "2px solid black",
          borderRadius: "5px",
          padding: "12px 0 12px 0",
        }}
      >
        <Grid item xs={12} md={4} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Log in
          </Typography>
          <Link
            to="/"
            sx={{
              alignSelf: "flex-start",
              mt: 1,
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:active": {
                backgroundColor: "transparent",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Return to Home
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ paddingRight: "24px" }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography>E-mail</Typography>
            <TextField id="email" variant="outlined" fullWidth sx={{ mt: 1 }} />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>Password</Typography>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Sign in
          </Button>
          <Box
            sx={{
              display: "inline-block",
              width: "auto",
            }}
          >
            <Link
              to="/register"
              sx={{
                color: "inherit",
                textDecoration: "none",
                padding: "4px 8px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              Create account
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
