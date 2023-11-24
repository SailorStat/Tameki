import EmptyShoppingList from "@components/EmptyShoppingList";
import ProductTiles from "@components/ProductTiles";
import ShoppingTiles from "@components/ShoppingTiles";
import { useSelector } from "@hooks";
import LayoutWithMenuTitle from "@layouts/LayoutWithMenuTitle";
import localization from "@localization";
import { Stack } from "@mui/material";
import { shoppingListLengthSelector } from "@slices/shoppingList";

const MakingOrder = () => {
  const shoppingListLength = useSelector(shoppingListLengthSelector);

  return (
    <LayoutWithMenuTitle subtitle={shoppingListLength} title={localization.shoppingList}>
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        {shoppingListLength ? (
          <Stack
            direction={{ lg: "row", md: "column" }}
            display="grid"
            gap={2}
            gridTemplateColumns={{ lg: "1fr 300px", md: "1fr" }}
          >
            <ShoppingTiles />
            <div>{"Купить"}</div>
          </Stack>
        ) : (
          <EmptyShoppingList />
        )}
      </div>
      <ProductTiles />
    </LayoutWithMenuTitle>
  );
};

export default MakingOrder;
