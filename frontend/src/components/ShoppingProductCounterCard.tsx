import ShoppingProductCounter from "@components/ShoppingProductCounter";
import { useSelector } from "@hooks";
import { CardContent, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
import { shoppingListProductSelectedSelector } from "@slices/shoppingList";
import { Product } from "@store";
import { formatPrice } from "@utils";

interface ShoppingProductCounterProps {
  productId: Product["id"];
}

const ShoppingProductCounterCard = ({ productId }: ShoppingProductCounterProps) => {
  const { price } = useSelector(createProductSelector(productId!));
  const productSelectedCount = useSelector((state) => shoppingListProductSelectedSelector(state, productId));

  return (
    <CardContent>
      <Typography component="div" variant="h6">
        {formatPrice(price * (productSelectedCount || 1))}
      </Typography>
      <ShoppingProductCounter productId={productId} />
    </CardContent>
  );
};

export default ShoppingProductCounterCard;
