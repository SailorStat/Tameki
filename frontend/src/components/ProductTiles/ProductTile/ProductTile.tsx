import React from "react";
import localization from "@localization";
import {
  ForumOutlined as ForumOutlinedIcon,
  RecommendOutlined as RecommendOutlinedIcon,
  ShoppingBasketOutlined as ShoppingBasketOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { Button, capitalize, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import SearchParams from "@router/SearchParams";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";
import { Product } from "@store";
import { formatPrice } from "@utils";
import { useSearchParams } from "react-router-dom";

import { ProductTileCard, ProductTileCardHeader, ProductTileCheckboxFavorite } from "./ProductTile.styles";
import ProductTileStatInfo from "./ProductTileStatInfo";

interface ProductTileProps {
  product: Product;
}

const ProductTile = ({ product }: ProductTileProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id, title, images, estimation, soldTimes, reviews, description, price } = product;

  const handleCardClick = React.useCallback(() => {
    searchParams.set(SearchParams.ProductId, id);
    setSearchParams(searchParams);
  }, [id, setSearchParams, searchParams]);

  const handleAddProductToShoppingList = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      dispatchedShoppingListActions.addProduct({ productId: id });
    },
    [id]
  );

  return (
    <ProductTileCard sx={{ cursor: "pointer" }} onClick={handleCardClick}>
      <CardMedia alt={title} component="img" height="194" image={images[0]} />
      <CardContent sx={{ display: "grid", gridTemplateRows: "max-content 1fr max-content" }}>
        <div>
          <Typography>{formatPrice(price)}</Typography>
          <ProductTileCardHeader fontWeight="bold" variant="body1">
            {title}
          </ProductTileCardHeader>
          <ProductTileCardHeader variant="body2">{description}</ProductTileCardHeader>
          <Stack direction="row" gap={2}>
            <ProductTileStatInfo
              count={estimation ? (Math.round(estimation / 2) / 10).toFixed(1) : undefined}
              Icon={RecommendOutlinedIcon}
            />
            <ProductTileStatInfo count={soldTimes} Icon={ShoppingCartOutlinedIcon} />
            <ProductTileStatInfo count={reviews} Icon={ForumOutlinedIcon} />
          </Stack>
        </div>
        <div />
        <CardActions sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Button
            size="small"
            startIcon={<ShoppingBasketOutlinedIcon />}
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={handleAddProductToShoppingList}
          >
            {capitalize(localization.toShoppingList)}
          </Button>
        </CardActions>
      </CardContent>
      <ProductTileCheckboxFavorite productId={id} />
    </ProductTileCard>
  );
};

export default ProductTile;
