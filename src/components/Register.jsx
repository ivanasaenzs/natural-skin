import React, { useState } from "react";
import { db } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  FormControl,
} from "@mui/material";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const Register = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleRegisterForm = async (data) => {
    const { username, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        username: username,
        email: email,
        orders: [],
        id: userCredential.user.uid,
        cart: [],
      };
      await setDoc(doc(db, "users", user.id), user);
      setRegisterSuccess(true);
      setRegisterError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setRegisterError(error.message);
      setRegisterSuccess(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleRegisterForm)}
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
        }}
      >
        <Grid item xs={12} md={4} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create Account
          </Typography>
          <Link
            to="/"
            sx={{
              alignSelf: "flex-start",
              mt: 1,
              color: "inherit",
              textDecoration: "none",
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
          <FormControl sx={{ mb: 3 }}>
            <Typography component="label">Username</Typography>
            <TextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              {...register("username", {
                required: "A value is required",
                minLength: {
                  value: 5,
                  message: "Username must contain at least 5 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: "This input does not accept special characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <Typography color="error">{message}</Typography>
              )}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <Typography component="label">E-mail</Typography>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
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
            <Typography component="label">Password</Typography>
            <TextField
              id="password"
              type={passwordType}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              {...register("password", {
                required: "A value is required",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters",
                },
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
            Create
          </Button>
          {registerError && (
            <Alert severity="error">Invalid E-mail and/or Password</Alert>
          )}
          {registerSuccess && (
            <Alert severity="success">
              Registration successful! Redirecting...
            </Alert>
          )}
          <Box sx={{ display: "block", width: "auto", mb: 2, mt: 2 }}>
            <Link
              to="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "4px 8px",
              }}
            >
              Already have an account? Sign in!
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
