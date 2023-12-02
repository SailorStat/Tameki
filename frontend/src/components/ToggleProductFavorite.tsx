import React from "react";
import { useSelector } from "@hooks";
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { Checkbox, CheckboxProps } from "@mui/material";
import { productSelector } from "@slices/products";
import { dispatchedProductActions } from "@slices/products/actions";

export interface ToggleProductFavoriteProps
  extends Omit<CheckboxProps, "checked" | "checkedIcon" | "color" | "icon" | "id" | "onClick"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  productId: string;
}

const ToggleProductFavorite = ({ onClick, productId, ...props }: ToggleProductFavoriteProps) => {
  const { favorites } = useSelector((state) => productSelector(state, productId));

  const handleFavoritesToggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      dispatchedProductActions.toggleFavorite({ productId });
      onClick?.(event);
    },
    [onClick, productId]
  );

  return (
    <Checkbox
      checked={favorites}
      checkedIcon={<FavoriteIcon />}
      icon={<FavoriteBorderIcon />}
      onClick={handleFavoritesToggle}
      {...props}
    />
  );
};

export default ToggleProductFavorite;
