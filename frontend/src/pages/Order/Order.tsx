import EmptyShoppingList from "@components/EmptyShoppingList";
import ProductTiles from "@components/ProductTiles";
import ShoppingChoose from "@components/ShoppingChoose";
import RemoveProductAlert from "@components/ShoppingTiles/RemoveProductSnackbar";
import { useSelector } from "@hooks";
import LayoutWithMenu from "@layouts/LayoutWithMenu";
import LayoutWithTitle from "@layouts/LayoutWithTitle";
import localization from "@localization";
import { shoppingListLengthSelector, shoppingListProductsCountSelector } from "@slices/shoppingList";

const Order = () => {
  const shoppingListProductsCount = useSelector(shoppingListProductsCountSelector);
  const shoppingListLength = useSelector(shoppingListLengthSelector);

  return (
    <LayoutWithMenu>
      <LayoutWithTitle subtitle={shoppingListProductsCount} title={localization.shoppingList}>
        <div style={{ minHeight: "calc(100vh - 60px)" }}>
          {shoppingListLength ? <ShoppingChoose /> : <EmptyShoppingList />}
        </div>
        <RemoveProductAlert />
        <ProductTiles />
      </LayoutWithTitle>
    </LayoutWithMenu>
  );
};

export default Order;
