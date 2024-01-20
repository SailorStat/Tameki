import EmptyShoppingList from "@components/EmptyShoppingList";
import ProductTiles from "@components/ProductTiles";
import ShoppingChoose from "@components/ShoppingChoose";
import RemoveProductAlert from "@components/ShoppingTiles/RemoveProductSnackbar";
import { useSelector } from "@hooks";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import LayoutWithTitle from "@layouts/LayoutWithTitle";
import localization from "@localization";
import { shoppingListLengthSelector, shoppingListProductsCountSelector } from "@slices/shoppingList";

const ShoppingList = () => {
  const shoppingListProductsCount = useSelector(shoppingListProductsCountSelector);
  const shoppingListLength = useSelector(shoppingListLengthSelector);

  return (
    <LayoutWithAppBar>
      <LayoutWithTitle subtitle={shoppingListProductsCount} title={localization.shoppingList}>
        <div style={{ minHeight: "calc(100vh - 60px)" }}>
          {shoppingListLength ? <ShoppingChoose /> : <EmptyShoppingList />}
        </div>
        <RemoveProductAlert />
        <ProductTiles />
      </LayoutWithTitle>
    </LayoutWithAppBar>
  );
};

export default ShoppingList;
