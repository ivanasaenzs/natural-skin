import React, { useContext, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import SearchBar from "../../components/Searchbar";
import { ProductsContext } from "../../context/ProductsContext";

export const ProductsContainer = () => {
  const { products } = useContext(ProductsContext);
  const [productFilter, setProductFilter] = useState("");

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(productFilter.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <SearchBar
          value={productFilter}
          onChange={(e) => {
            setProductFilter(e.target.value);
          }}
          sx={{
            flexGrow: 0,
          }}
        />
      </Box>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(({ productName, productImage, id }) => (
            <ProductCard
              productName={productName}
              productImage={productImage}
              key={id}
              id={id}
            />
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Container>
    </>
  );
};
