import { useProductId, useSelector } from "@hooks";
import { Stack, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";

import AboutProduct from "./AboutProduct";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductReview from "./ProductReview";

const Product = () => {
  const productId = useProductId()!;
  const { title } = useSelector(createProductSelector(productId));

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{title}</Typography>
      <Stack display="grid" gap={2} gridTemplateColumns={{ md: "350px 1fr" }}>
        <ProductImageCarousel />
        <AboutProduct productId={productId} />
        <ProductReview productId={productId} />
      </Stack>
    </Stack>
  );
};

export default Product;
