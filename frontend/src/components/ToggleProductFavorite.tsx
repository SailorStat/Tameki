import React from "react";
import { useSelector } from "@hooks";
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { Checkbox, CheckboxProps } from "@mui/material";
import { createProductSelector } from "@slices/products";
import { dispatchedProductActions } from "@slices/products/actions";

export interface ToggleProductFavoriteProps
  extends Omit<CheckboxProps, "checked" | "checkedIcon" | "color" | "icon" | "id" | "onClick"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  productId: number;
}

const ToggleProductFavorite = ({ onClick, productId, ...props }: ToggleProductFavoriteProps) => {
  const { favorites } = useSelector(createProductSelector(productId));

  const handleFavoritesToggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
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
