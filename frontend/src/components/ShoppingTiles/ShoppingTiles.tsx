import { useSelector } from "@hooks";
import localization from "@localization";
import { Button, Divider, Stack } from "@mui/material";
import { shoppingListProductsSelector } from "@slices/shoppingList";

const ShoppingTiles = () => {
  const shoppingListProducts = useSelector(shoppingListProductsSelector);

  console.log(shoppingListProducts);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="end">
        <Button variant="contained">{localization.chooseAll}</Button>
      </Stack>
      <Stack divider={<Divider />}>
        {shoppingListProducts.map((product) => (
          <div key={product.id}>{product.id}</div>
        ))}
      </Stack>
    </Stack>
  );
};

export default ShoppingTiles;
