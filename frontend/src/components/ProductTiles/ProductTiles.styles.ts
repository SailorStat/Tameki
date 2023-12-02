import ToggleProductFavorite from "@components/ToggleProductFavorite";
import { Card, styled, Typography, typographyClasses } from "@mui/material";

export const ProductTilesCard = styled(Card)({
  display: "grid",
  gridTemplateRows: "max-content 1fr",
  minHeight: "35vh",
  position: "relative",
});

export const ProductTilesCardHeader = styled(Typography)({
  [`&.${typographyClasses.root}`]: {
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": "2",
    display: "-webkit-box",
    overflow: "hidden",
  },
});

export const ProductTilesCheckboxFavorite = styled(ToggleProductFavorite)({
  position: "absolute",
  right: 1,
  top: 1,
});
