import { useSelector } from "@hooks";
import { Card, CardMedia } from "@mui/material";
import { productSelector } from "@slices/products";
import { Product } from "@store";

import ShoppingListProductInfo from "./ShoppingListProductInfo";
import ShoppingProductCounter from "./ShoppingProductCounter";

interface ShoppingTileProps {
  productId: Product["id"];
}

const ShoppingTile = ({ productId }: ShoppingTileProps) => {
  const { title, images } = useSelector((state) => productSelector(state, productId));

  return (
    <Card sx={{ display: "grid", gridTemplateColumns: "25% 1fr 180px", height: 120 }}>
      <CardMedia alt={title} component="img" height="120" image={images[0]} />
      <ShoppingListProductInfo productId={productId} />
      <ShoppingProductCounter productId={productId} />
    </Card>
  );
};

export default ShoppingTile;
