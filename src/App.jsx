import React, { useState } from "react";

import Header from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { LogIn } from "./components/LogIn";
import { Register } from "./components/Register";
import { Error } from "./components/Error";
import ShoppingCartDrawer from "./components/pages/ShoppingCartDrawer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsCartOpen(open);
  };

  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header toggleCart={toggleDrawer(true)} />
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
      <ShoppingCartDrawer isOpen={isCartOpen} toggleDrawer={toggleDrawer} />
    </Router>
  );
}

export default App;
