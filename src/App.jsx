import React from "react";

import Header from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

import Box from "@mui/material/Box";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, marginBottom: "12px" }}>
        <Main />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
