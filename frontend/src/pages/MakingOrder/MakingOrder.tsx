import EmptyShoppingList from "@components/EmptyShoppingList";
import ProductTiles from "@components/ProductTiles";
import ShoppingChoose from "@components/ShoppingChoose";
import { useSelector } from "@hooks";
import LayoutWithMenuTitle from "@layouts/LayoutWithMenuTitle";
import localization from "@localization";
import { shoppingListLengthSelector } from "@slices/shoppingList";

const MakingOrder = () => {
  const shoppingListLength = useSelector(shoppingListLengthSelector);

  return (
    <LayoutWithMenuTitle subtitle={shoppingListLength} title={localization.shoppingList}>
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        {shoppingListLength ? <ShoppingChoose /> : <EmptyShoppingList />}
      </div>
      <ProductTiles />
    </LayoutWithMenuTitle>
  );
};

export default MakingOrder;
