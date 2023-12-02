import React from "react";
import ToggleProductFavorite from "@components/ToggleProductFavorite";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CardContent, IconButton, Typography } from "@mui/material";
import { productSelector } from "@slices/products";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { Product } from "@store";

interface ShoppingListProductInfoProps {
  productId: Product["id"];
}

const ShoppingListProductInfo = ({ productId }: ShoppingListProductInfoProps) => {
  const { title, inStock } = useSelector((state) => productSelector(state, productId));

  const handleToRemoveProduct = React.useCallback(() => {
    dispatchedShoppingListActions.toRemoveProduct({ productId });
  }, [productId]);

  return (
    <CardContent>
      <Typography component="div" variant="h6">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {`${localization.inStock}: ${inStock} ${localization.psc}`}
      </Typography>
      <ToggleProductFavorite productId={productId} />
      <IconButton onClick={handleToRemoveProduct}>
        <DeleteIcon />
      </IconButton>
    </CardContent>
  );
};

export default ShoppingListProductInfo;
