import { useSelector } from "@hooks";
import localization from "@localization";
import { Button, Divider, Stack } from "@mui/material";
import { shoppingListProductIdsSelector } from "@slices/shoppingList";

import ShoppingTile from "./ShoppingTile";

const ShoppingTiles = () => {
  const shoppingListProductIds = useSelector(shoppingListProductIdsSelector);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="end">
        <Button variant="contained">{localization.chooseAll}</Button>
      </Stack>
      <Stack divider={<Divider />} spacing={2}>
        {shoppingListProductIds.map((productId) => (
          <ShoppingTile key={productId} productId={productId} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ShoppingTiles;
