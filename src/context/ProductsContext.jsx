import React, { createContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const value = {
    products,
    setProducts,
    error,
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const dbCollectionReference = collection(db, "products");
        const data = await getDocs(dbCollectionReference);

        const productsArray = data.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(productsArray);
      } catch (error) {
        setError("Error fetching products from Firebase:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
      {error && <Box>{error}</Box>}
    </ProductsContext.Provider>
  );
};
