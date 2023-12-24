import React from "react";
import ToShoppingList from "@components/ToShoppingList";
import {
  ForumOutlined as ForumOutlinedIcon,
  RecommendOutlined as RecommendOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import SearchParams from "@router/SearchParams";
import { Product } from "@store";
import { formatEstimation, formatPrice } from "@utils";
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
            <ProductTileStatInfo count={formatEstimation(estimation)} Icon={RecommendOutlinedIcon} />
            <ProductTileStatInfo count={soldTimes} Icon={ShoppingCartOutlinedIcon} />
            <ProductTileStatInfo count={reviews} Icon={ForumOutlinedIcon} />
          </Stack>
        </div>
        <div />
        <CardActions sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <ToShoppingList productId={id} />
        </CardActions>
      </CardContent>
      <ProductTileCheckboxFavorite productId={id} />
    </ProductTileCard>
  );
};

export default ProductTile;
