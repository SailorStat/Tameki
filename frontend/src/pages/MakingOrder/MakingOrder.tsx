import EmptyShoppingList from "@components/EmptyShoppingList";
import ProductTiles from "@components/ProductTiles";
import ShoppingChoose from "@components/ShoppingChoose";
import RemoveProductAlert from "@components/ShoppingTiles/RemoveProductSnackbar";
import { useSelector } from "@hooks";
import LayoutWithMenuTitle from "@layouts/LayoutWithMenuTitle";
import localization from "@localization";
import { shoppingListLengthSelector, shoppingListProductsCountSelector } from "@slices/shoppingList";

const MakingOrder = () => {
  const shoppingListProductsCount = useSelector(shoppingListProductsCountSelector);
  const shoppingListLength = useSelector(shoppingListLengthSelector);

  return (
    <LayoutWithMenuTitle subtitle={shoppingListProductsCount} title={localization.shoppingList}>
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        {shoppingListLength ? <ShoppingChoose /> : <EmptyShoppingList />}
      </div>
      <RemoveProductAlert />
      <ProductTiles />
    </LayoutWithMenuTitle>
  );
};

export default MakingOrder;
