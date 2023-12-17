import { useProductId, useSelector } from "@hooks";
import { Stack, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";

import ProductImageCarousel from "./ProductImageCarousel";

const Product = () => {
  const productId = useProductId();
  const { title } = useSelector(createProductSelector(productId!));

  return (
    <Stack spacing={1}>
      <Typography sx={{ paddingRight: 10 }} variant="h4">
        {title}
      </Typography>
      <Stack display="grid" gap={2} gridTemplateColumns={{ sm: "350px 1fr" }}>
        <ProductImageCarousel />
        <div>{"description"}</div>
      </Stack>
    </Stack>
  );
};

export default Product;
