import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../hooks/useFirebase";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ProductDetails = () => {
  const { id } = useParams();
  const { error, loading, response } = useFirebase({
    url: `/${id}`,
    method: "get",
  });
  const [showSpinner, setShowSpinner] = useState(true);

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
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size="80px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" color="error">
          Error fetching product details
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
        >
          Take me back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #000",
        width: "900px",
        height: "500px",
        marginTop: "20px",
        marginX: "auto",
        padding: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        gap: "15px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link
          to="/products"
          style={{
            fontSize: "0.8em",
            textDecoration: "none",
            textTransform: "uppercase",
            backgroundColor: "#b0f2b4",
            borderRadius: "20px",
            padding: "8px 16px",
            color: "inherit",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Take me back
        </Link>
        <img
          src={response?.productImage}
          alt={response?.productName}
          style={{ maxWidth: "280px", marginBottom: "20px" }}
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
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          {response?.productName}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "17px", marginBottom: "10px" }}
        >
          {response?.productDescription}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          ${response?.productPrice}
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: "8px",
            padding: "8px 16px",
            alignSelf: "center",
            minWidth: "fit-content",
          }}
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
