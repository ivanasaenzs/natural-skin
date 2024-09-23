import React, { useContext, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
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
      {/* Products */}
      <Container sx={{ marginTop: "20px", marginBottom: "18px" }}>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map(({ productName, productImage, id }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <ProductCard
                  productName={productName}
                  productImage={productImage}
                  id={id}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center">No products found.</Typography>
        )}
      </Container>
    </>
  );
};
