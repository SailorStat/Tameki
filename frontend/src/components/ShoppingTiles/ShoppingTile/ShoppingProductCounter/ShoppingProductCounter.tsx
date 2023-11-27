import React from "react";
import { useSelector } from "@hooks";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button, CardContent, Typography } from "@mui/material";
import { shoppingListProductSelectedSelector } from "@slices/shoppingList";
import { useDispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { Product } from "@store";
import { formatPrice } from "@utils";

import { TextFieldCounter } from "./ShoppingProductCounter.styles";

interface ShoppingProductCounterProps {
  product: Product;
}

const ShoppingProductCounter = ({ product }: ShoppingProductCounterProps) => {
  const { price, id, inStock } = product;
  const productSelectedCount = useSelector((state) => shoppingListProductSelectedSelector(state, id));
  const { changeProductCount, incrementProductCount, decrementProductCount } = useDispatchedShoppingListActions();

  const handleDecrementProductToShoppingList = React.useCallback(() => {
    decrementProductCount({ productId: id });
  }, [id, decrementProductCount]);

  const handleChangeProductToShoppingList = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      changeProductCount({ count: Math.round(Math.min(Math.max(+target.value, 0), inStock)), productId: id });
    },
    [changeProductCount, inStock, id]
  );

  const handleIncrementProductToShoppingList = React.useCallback(() => {
    incrementProductCount({ productId: id });
  }, [id, incrementProductCount]);

  return (
    <CardContent>
      <Typography component="div" variant="h6">
        {formatPrice(price * (productSelectedCount || 1))}
      </Typography>
      <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 48px" }}>
        <Button sx={{ minWidth: 30 }} variant="contained" onClick={handleDecrementProductToShoppingList}>
          <RemoveIcon />
        </Button>
        <TextFieldCounter value={productSelectedCount} onChange={handleChangeProductToShoppingList} />
        <Button sx={{ minWidth: 30 }} variant="contained" onClick={handleIncrementProductToShoppingList}>
          <AddIcon />
        </Button>
      </div>
    </CardContent>
  );
};

export default ShoppingProductCounter;
