import { useSelector } from "@hooks";
import localization from "@localization";
import { Button, Divider, Stack } from "@mui/material";
import { shoppingListProductsSelector } from "@slices/shoppingList";

import ShoppingTile from "./ShoppingTile";

const ShoppingTiles = () => {
  const shoppingListProducts = useSelector(shoppingListProductsSelector);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="end">
        <Button variant="contained">{localization.chooseAll}</Button>
      </Stack>
      <Stack divider={<Divider />} spacing={2}>
        {shoppingListProducts.map((product) => (
          <ShoppingTile key={product.id} product={product} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ShoppingTiles;
