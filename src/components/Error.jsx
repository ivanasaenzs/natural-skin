import React from "react";

import { Box, Typography } from "@mui/material";

import { TbError404 } from "react-icons/tb";

export const Error = () => {
  return (
    <Box
      sx={{
        height: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TbError404 size="90" />
      <Typography>Oops!</Typography>
      <Typography>
        The page you&apos;re looking for doesn&apos;t exist
      </Typography>
    </Box>
  );
};
