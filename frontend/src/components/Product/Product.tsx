import ToShoppingList from "@components/ToShoppingList";
import { useProductId, useSelector } from "@hooks";
import { Stack, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
import TextFieldCopy from "@ui/TextFieldCopy";

import ProductImageCarousel from "./ProductImageCarousel";

const Product = () => {
  const productId = useProductId()!;

  const { title, article, description, estimation, favorites, inStock, labels, price, reviews, soldTimes } =
    useSelector(createProductSelector(productId));

  return (
    <Stack spacing={1}>
      <Typography variant="h4">{title}</Typography>
      <Stack display="grid" gap={2} gridTemplateColumns={{ sm: "350px 1fr" }}>
        <ProductImageCarousel />
        <div style={{ paddingRight: 20 }}>
          <ToShoppingList productId={productId} />
          <Typography sx={{ whiteSpace: "pre-line" }} variant="subtitle1">
            {description}
          </Typography>
          <TextFieldCopy fullWidth={false} size="small" value={article} variant="standard" />
          <Typography variant="subtitle1">
            {"оценка "}
            {estimation}
          </Typography>
          <Typography variant="subtitle1">
            {"inStock "}
            {inStock}
          </Typography>
          <Typography variant="subtitle1">
            {"labels"}
            {labels}
          </Typography>
          <Typography variant="subtitle1">
            {"price"}
            {price}
          </Typography>
          <Typography variant="subtitle1">
            {"soldTimes"}
            {soldTimes}
          </Typography>
          <Typography variant="subtitle1">
            {"reviews"}
            {reviews}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
};

export default Product;
