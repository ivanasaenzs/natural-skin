import React from "react";

import Header from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
// import { LogIn } from "./components/LogIn";
// import { Register } from "./components/Register";
// import { Error } from "./components/Error";

import Box from "@mui/material/Box";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ minHeight: "100vh" }}>
        <Main />
        {/* <Error /> */}
        {/* <LogIn /> */}
        {/* <Register /> */}
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
