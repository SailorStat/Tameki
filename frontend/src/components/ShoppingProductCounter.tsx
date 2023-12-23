import React from "react";
import { useSelector } from "@hooks";
import { createProductSelector } from "@slices/products";
import { shoppingListProductSelectedSelector } from "@slices/shoppingList";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { Product } from "@store";
import QuantityInput from "@ui/QuantityInput";

interface ShoppingProductCounterProps {
  productId: Product["id"];
}

const ShoppingProductCounter = ({ productId }: ShoppingProductCounterProps) => {
  const { inStock } = useSelector(createProductSelector(productId!));
  const productSelectedCount = useSelector((state) => shoppingListProductSelectedSelector(state, productId));

  const handleDecrementProductToShoppingList = React.useCallback(() => {
    dispatchedShoppingListActions.decrementProductCount({ productId });
  }, [productId]);

  const handleChangeProductToShoppingList = React.useCallback(
    (count: number) => {
      dispatchedShoppingListActions.changeProductCount({ count, productId });
    },
    [productId]
  );

  const handleIncrementProductToShoppingList = React.useCallback(() => {
    dispatchedShoppingListActions.incrementProductCount({ productId });
  }, [productId]);

  return (
    <QuantityInput
      maxValue={inStock}
      minValue={0}
      value={productSelectedCount}
      onChange={handleChangeProductToShoppingList}
      onDecrement={handleDecrementProductToShoppingList}
      onIncrement={handleIncrementProductToShoppingList}
    />
  );
};

export default ShoppingProductCounter;
