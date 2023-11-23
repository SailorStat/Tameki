import { useSelector } from "@hooks";
import { ShoppingBasketOutlined as ShoppingBasketOutlinedIcon } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { productsInShoppingListSelector } from "@slices/shoppingList";

const ShoppingListTrigger = () => {
  const productsInShoppingList = useSelector(productsInShoppingListSelector);

  return (
    <IconButton color="inherit">
      <Badge badgeContent={productsInShoppingList} color="warning">
        <ShoppingBasketOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default ShoppingListTrigger;
