import React from "react";
import { useSelector } from "@hooks";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button, CardContent, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
import { shoppingListProductSelectedSelector } from "@slices/shoppingList";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { Product } from "@store";
import { formatPrice } from "@utils";

import { TextFieldCounter } from "./ShoppingProductCounter.styles";

interface ShoppingProductCounterProps {
  productId: Product["id"];
}

const ShoppingProductCounter = ({ productId }: ShoppingProductCounterProps) => {
  const { inStock, price } = useSelector(createProductSelector(productId!));
  const productSelectedCount = useSelector((state) => shoppingListProductSelectedSelector(state, productId));

  const handleDecrementProductToShoppingList = React.useCallback(() => {
    dispatchedShoppingListActions.decrementProductCount({ productId });
  }, [productId]);

  const handleChangeProductToShoppingList = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatchedShoppingListActions.changeProductCount({
        count: Math.round(Math.min(Math.max(+target.value, 0), inStock)),
        productId,
      });
    },
    [inStock, productId]
  );

  const handleIncrementProductToShoppingList = React.useCallback(() => {
    dispatchedShoppingListActions.incrementProductCount({ productId });
  }, [productId]);

  return (
    <CardContent>
      <Typography component="div" variant="h6">
        {formatPrice(price * (productSelectedCount || 1))}
      </Typography>
      <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 48px" }}>
        <Button
          disabled={!productSelectedCount}
          sx={{ minWidth: 30 }}
          variant="contained"
          onClick={handleDecrementProductToShoppingList}
        >
          <RemoveIcon />
        </Button>
        <TextFieldCounter value={productSelectedCount} onChange={handleChangeProductToShoppingList} />
        <Button
          disabled={productSelectedCount === inStock}
          sx={{ minWidth: 30 }}
          variant="contained"
          onClick={handleIncrementProductToShoppingList}
        >
          <AddIcon />
        </Button>
      </div>
    </CardContent>
  );
};

export default ShoppingProductCounter;
