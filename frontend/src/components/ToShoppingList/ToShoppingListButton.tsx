import React from "react";
import localization from "@localization";
import { ShoppingBasketOutlined as ShoppingBasketOutlinedIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { capitalize } from "lodash";

interface ToShoppingListButtonProps {
  productId: string;
}

const ToShoppingListButton = ({ productId }: ToShoppingListButtonProps) => {
  const handleAddProductToShoppingList = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      dispatchedShoppingListActions.addProduct({ productId });
    },
    [productId]
  );

  return (
    <Button
      size="small"
      startIcon={<ShoppingBasketOutlinedIcon />}
      sx={{ textTransform: "none", width: 150 }}
      variant="contained"
      onClick={handleAddProductToShoppingList}
    >
      {capitalize(localization.toShoppingList)}
    </Button>
  );
};

export default ToShoppingListButton;
