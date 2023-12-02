import ToggleProductFavorite from "@components/ToggleProductFavorite";
import { Card, styled, Typography, typographyClasses } from "@mui/material";

export const ProductTileCard = styled(Card)({
  display: "grid",
  gridTemplateRows: "max-content 1fr",
  minHeight: "35vh",
  position: "relative",
});

export const ProductTileCardHeader = styled(Typography)({
  [`&.${typographyClasses.root}`]: {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
  },
});

export const ProductTileCheckboxFavorite = styled(ToggleProductFavorite)({
  position: "absolute",
  right: 1,
  top: 1,
});
