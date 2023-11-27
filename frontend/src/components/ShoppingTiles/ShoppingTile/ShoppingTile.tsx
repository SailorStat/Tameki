import { Card, CardMedia } from "@mui/material";
import { Product } from "@store";

import ShoppingListProductInfo from "./ShoppingListProductInfo";
import ShoppingProductCounter from "./ShoppingProductCounter";

interface ShoppingTileProps {
  product: Product;
}

const ShoppingTile = ({ product }: ShoppingTileProps) => {
  const { title, images } = product;

  return (
    <Card sx={{ display: "grid", gridTemplateColumns: "25% 1fr 180px", height: 120 }}>
      <CardMedia alt={title} component="img" height="120" image={images[0]} />
      <ShoppingListProductInfo product={product} />
      <ShoppingProductCounter product={product} />
    </Card>
  );
};

export default ShoppingTile;
