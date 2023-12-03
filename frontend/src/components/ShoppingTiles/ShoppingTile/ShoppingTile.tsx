import { useSelector } from "@hooks";
import { Card, CardMedia } from "@mui/material";
import { productSelector } from "@slices/products";
import { shoppingListIsInOrderProductSelector } from "@slices/shoppingList";
import { Product } from "@store";

import ShoppingListProductInfo from "./ShoppingListProductInfo";
import ShoppingProductCounter from "./ShoppingProductCounter";
import ShoppingProductToOrderCheckbox from "./ShoppingProductToOrderCheckbox";

interface ShoppingTileProps {
  productId: Product["id"];
}

const ShoppingTile = ({ productId }: ShoppingTileProps) => {
  const { title, images } = useSelector((state) => productSelector(state, productId));
  const isInOrder = useSelector((state) => shoppingListIsInOrderProductSelector(state, productId));

  return (
    <Card elevation={isInOrder ? 8 : 2} sx={{ display: "grid", gridTemplateColumns: "25% 1fr 180px 1px", height: 120 }}>
      <CardMedia alt={title} component="img" height="120" image={images[0]} />
      <ShoppingListProductInfo productId={productId} />
      <ShoppingProductCounter productId={productId} />
      <ShoppingProductToOrderCheckbox productId={productId} />
    </Card>
  );
};

export default ShoppingTile;
