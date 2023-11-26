import localization from "@localization";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CardContent, IconButton, Typography } from "@mui/material";
import { Product } from "@store";
import CheckboxFavorite from "@ui/checkboxes/CheckboxFavorite";

interface ShoppingListProductInfoProps {
  product: Product;
}

const ShoppingListProductInfo = ({ product: { title, inStock, favorites, id } }: ShoppingListProductInfoProps) => {
  return (
    <CardContent>
      <Typography component="div" variant="h6">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {`${localization.inStock}: ${inStock} ${localization.psc}`}
      </Typography>
      <CheckboxFavorite checked={favorites} id={id} onClick={console.log} />
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </CardContent>
  );
};

export default ShoppingListProductInfo;
