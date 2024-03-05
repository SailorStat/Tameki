import React from "react";
import { useSelector } from "@hooks";
import { Checkbox } from "@mui/material";
import { shoppingListIsInOrderProductSelector } from "@slices/shoppingList";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";

interface ShoppingProductToOrderCheckboxProps {
  productId: number;
}

const ShoppingProductToOrderCheckbox = ({ productId }: ShoppingProductToOrderCheckboxProps) => {
  const isInOrder = useSelector((state) => shoppingListIsInOrderProductSelector(state, productId));

  const handleProductIsInOrderToggle = React.useCallback(() => {
    dispatchedShoppingListActions.toggleProductIdIsInOrder({ productId });
  }, [productId]);

  return (
    <div style={{ position: "relative" }}>
      <Checkbox
        checked={isInOrder}
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={handleProductIsInOrderToggle}
      />
    </div>
  );
};

export default ShoppingProductToOrderCheckbox;
