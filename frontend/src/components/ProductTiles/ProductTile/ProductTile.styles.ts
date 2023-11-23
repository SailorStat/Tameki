import { Card, styled, Typography, typographyClasses } from "@mui/material";
import CheckboxFavorite from "@ui/checkboxes/CheckboxFavorite";

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

export const ProductTileCheckboxFavorite = styled(CheckboxFavorite)({
  position: "absolute",
  right: 1,
  top: 1,
});
