import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../hooks/useFirebase";
import { useCart } from "../../hooks/useCart";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ProductDetails = () => {
  const { id } = useParams();
  const { error, loading, response } = useFirebase({
    url: `/${id}`,
    method: "get",
  });
  const [showSpinner, setShowSpinner] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
    } else {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showSpinner) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size="80px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
      >
        <Typography variant="h6" color="error">
          Error fetching product details
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#f58549",
            "&:hover": {
              backgroundColor: "#fec89a",
            },
          }}
        >
          Take me back
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: response?.id,
      productName: response?.productName,
      productPrice: response?.productPrice,
      productImage: response?.productImage,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e0e0e0",
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
        maxWidth: "900px",
        height: "auto",
        marginTop: "20px",
        marginX: "auto",
        marginBottom: "60px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        gap: "15px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "16px",
        }}
      >
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#f58549",
            "&:hover": {
              backgroundColor: "#fec89a",
            },
            borderRadius: "20px",
            marginBottom: "10px",
          }}
        >
          Take me back
        </Button>
        <img
          src={response?.productImage}
          alt={response?.productName}
          style={{
            maxWidth: "280px",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          flex: "1 1 65%",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "10px", fontWeight: "bold" }}
        >
          {response?.productName}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "17px", marginBottom: "10px", color: "#555" }}
        >
          {response?.productDescription}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "10px", color: "#000" }}>
          ${response?.productPrice}
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: "8px",
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: "#f58549",
            "&:hover": {
              backgroundColor: "#fec89a",
            },
          }}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};
