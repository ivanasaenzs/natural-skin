import React from "react";

import Header from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { LogIn } from "./components/LogIn";
import { Register } from "./components/Register";
import { Error } from "./components/Error";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
