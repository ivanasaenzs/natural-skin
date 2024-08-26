import React from "react";

import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";

// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const Register = () => {
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
        sx={{ border: "2px solid black", borderRadius: "5px" }}
      >
        <Grid item xs={12} md={4} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create Account
          </Typography>
          <Link
            href="#"
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
            <Typography>First Name</Typography>
            <TextField
              id="firstName"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
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
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
