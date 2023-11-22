import React from "react";
import { useDispatch, useSelector } from "@hooks";
import localization from "@localization";
import {
  ForumOutlined as ForumOutlinedIcon,
  RecommendOutlined as RecommendOutlinedIcon,
  ShoppingBasketOutlined as ShoppingBasketOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { Button, capitalize, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { productsSelector, toggleFavoriteProduct } from "@slices/products";
import { formatPrice } from "@utils";

import { ProductTilesCard, ProductTilesCardHeader, ProductTilesCheckboxFavorite } from "./ProductTiles.styles";

const ProductTiles = () => {
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();

  const handleFavoritesToggle = React.useCallback(
    ({ target }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if ("id" in target && typeof target.id === "string") {
        dispatch(toggleFavoriteProduct({ id: target.id }));
      }
    },
    [dispatch]
  );

  return (
    <Stack
      direction="row"
      display="grid"
      gap={{ lg: 3, md: 2, sm: 2, xl: 3, xs: 1 }}
      gridTemplateColumns={{
        lg: "repeat(4, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        xl: "repeat(5, 1fr)",
        xs: "repeat(2, 1fr)",
      }}
    >
      {products.map(({ id, title, images, favorites, estimation, soldTimes, reviews, description, price }) => (
        <ProductTilesCard key={id}>
          <CardMedia alt={title} component="img" height="194" image={images[0]} />
          <CardContent sx={{ display: "grid", gridTemplateRows: "max-content 1fr max-content" }}>
            <div>
              <Typography fontWeight="bold">{`${formatPrice(price)} ₽`}</Typography>
              <ProductTilesCardHeader fontWeight="bold" variant="body1">
                {title}
              </ProductTilesCardHeader>
              <ProductTilesCardHeader variant="body2">{description}</ProductTilesCardHeader>
              <Stack direction="row" gap={2}>
                <Stack alignItems="center" direction="row" gap={0.25}>
                  <RecommendOutlinedIcon fontSize="small" />
                  <Typography display="block" lineHeight={1} textAlign="center" variant="caption">
                    {(Math.round(estimation / 2) / 10).toFixed(1)}
                  </Typography>
                </Stack>
                <Stack alignItems="center" direction="row" gap={0.25}>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                  <Typography display="block" lineHeight={1} textAlign="center" variant="caption">
                    {soldTimes}
                  </Typography>
                </Stack>
                <Stack alignItems="center" direction="row" gap={0.25}>
                  <ForumOutlinedIcon fontSize="small" />
                  <Typography display="block" lineHeight={1} textAlign="center" variant="caption">
                    {reviews}
                  </Typography>
                </Stack>
              </Stack>
            </div>
            <div style={{ flex: "flex: 1 0 auto", margin: "auto" }} />
            <CardActions sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button
                size="small"
                startIcon={<ShoppingBasketOutlinedIcon />}
                sx={{ textTransform: "none" }}
                variant="contained"
              >
                {capitalize(localization.toShoppingBasket)}
              </Button>
            </CardActions>
          </CardContent>
          <ProductTilesCheckboxFavorite checked={favorites} id={id} onClick={handleFavoritesToggle} />
        </ProductTilesCard>
      ))}
    </Stack>
  );
};

export default ProductTiles;
