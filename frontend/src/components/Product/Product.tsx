import { useProductId, useSelector } from "@hooks";
import { Stack, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";

import AboutProduct from "./AboutProduct";
import ProductImageCarousel from "./ProductImageCarousel";

const Product = () => {
  const productId = useProductId()!;
  const { title } = useSelector(createProductSelector(productId));

  return (
    <Stack spacing={1}>
      <Typography variant="h4">{title}</Typography>
      <Stack display="grid" gap={2} gridTemplateColumns={{ sm: "350px 1fr" }}>
        <ProductImageCarousel />
        <AboutProduct productId={productId} />
      </Stack>
    </Stack>
  );
};

export default Product;
