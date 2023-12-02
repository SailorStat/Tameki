import { useSelector } from "@hooks";
import { ShoppingBasketOutlined as ShoppingBasketOutlinedIcon } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import Paths from "@router/Paths";
import { shoppingListProductsCountSelector } from "@slices/shoppingList";
import { useNavigate } from "react-router-dom";

const ShoppingListTrigger = () => {
  const shoppingListLength = useSelector(shoppingListProductsCountSelector);
  const navigate = useNavigate();

  return (
    <IconButton color="inherit" onClick={() => navigate(Paths.shoppingList())}>
      <Badge badgeContent={shoppingListLength} color="warning">
        <ShoppingBasketOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default ShoppingListTrigger;
