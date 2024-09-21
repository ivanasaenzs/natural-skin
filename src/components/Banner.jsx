import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FaLeaf, FaRecycle, FaBreadSlice } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { MdCrueltyFree } from "react-icons/md";
import { LuVegan } from "react-icons/lu";

export const Banner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FaLeaf size={60} color="#4caf50" />
            <Typography variant="body1">Natural Ingredients</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FaRecycle size={60} color="#ff9800" />
            <Typography variant="body1">Recyclable Packaging</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LuVegan size={60} color="#e91e63" />
            <Typography variant="body1">Vegan</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <GiWaterDrop size={60} color="#2196f3" />
            <Typography variant="body1">Paraben Free</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MdCrueltyFree size={60} color="#ff5722" />
            <Typography variant="body1">Cruelty Free</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FaBreadSlice size={60} color="#9c27b0" />
            <Typography variant="body1">Gluten Free</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
