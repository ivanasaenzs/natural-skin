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
  FormControl,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const LogIn = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleLoginForm = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorCode, errorMessage);
      });
  };

  return (
    <Box
      onSubmit={handleSubmit(handleLoginForm)}
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
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
        {/* log-in form with validations */}
        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ paddingRight: "24px" }}
        >
          <FormControl sx={{ mb: 3 }}>
            <Typography>E-mail</Typography>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => setEmail(e.target.value)}
              {...register("email", {
                required: "A value is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "This is not a valid e-mail address",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <Typography color="error">{message}</Typography>
              )}
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <Typography>Password</Typography>
            <TextField
              id="password"
              type={passwordType}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => setPassword(e.target.value)}
              {...register("password", {
                required: "A value is required",
              })}
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
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <Typography color="error">{message}</Typography>
              )}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mb: 2,
              backgroundColor: "#f58549",
              "&:hover": {
                backgroundColor: "#fec89a",
              },
            }}
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
