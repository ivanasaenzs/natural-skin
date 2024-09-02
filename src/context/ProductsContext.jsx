import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const value = {
    products,
    setProducts,
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
        console.log("Fetched products:", productsArray);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
