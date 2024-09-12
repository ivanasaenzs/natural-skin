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
} from "@mui/material";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegisterForm = (e) => {
    e.preventDefault();

    const registerNewUser = async (newUser) => {
      try {
        await setDoc(doc(db, "users", newUser.id), newUser);
        console.log("nuevo usuario creado en firebase");
      } catch (err) {
        err;
      }
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          username: userName,
          email: email,
          orders: [],
          id: userCredential.user.uid,
          cart: [],
        };
        registerNewUser(user);
        console.log("nuevo usuario: ", user);
        setRegisterSuccess(true);
        setRegisterError("");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        setRegisterError(error.message);
        setRegisterSuccess(false);
      });
  };

  return (
    <Box
      onSubmit={handleRegisterForm}
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
          <Box sx={{ mb: 3 }}>
            <Typography>Username</Typography>
            <TextField
              id="username"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>E-mail</Typography>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              value={email}
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
