import { useSelector } from "@hooks";
import { Stack } from "@mui/material";
import { productsSelector } from "@slices/products";

import ProductTile from "./ProductTile";

const ProductTiles = () => {
  const products = useSelector(productsSelector);

  return (
    <Stack
      direction="row"
      display="grid"
      gap={{ lg: 3, md: 2, sm: 2, xl: 3, xs: 1 }}
      gridTemplateColumns={{
        lg: "repeat(4, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        xl: "repeat(5, 1fr)",
        xs: "repeat(2, 1fr)",
      }}
    >
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </Stack>
  );
};

export default ProductTiles;
