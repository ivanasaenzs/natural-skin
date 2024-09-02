import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsProvider>
      <CssBaseline />
      <App />
    </ProductsProvider>
  </StrictMode>
);
