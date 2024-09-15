import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const LogIn = () => {
  const [loginError, setLoginError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleLoginForm = (e) => {
    e.preventDefault();

    // agregar validaciones - react hook form

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorCode, errorMessage);
      });
  };

  return (
    <Box
      onSubmit={handleLoginForm}
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
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>Password</Typography>
            <TextField
              id="password"
              type={passwordType}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setPasswordType(
                          passwordType === "password" ? "text" : "password"
                        )
                      }
                    >
                      {passwordType === "password" ? (
                        <IoEyeOffOutline />
                      ) : (
                        <IoEyeOutline />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          {loginError && (
            <Alert severity="error">
              Invalid E-mail and/or Password. Please try again.
            </Alert>
          )}
          <Box
            sx={{
              display: "block",
              width: "auto",
            }}
          >
            <Link
              to="/register"
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "4px 8px",
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