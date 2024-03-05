import ShoppingProductCounter from "@components/ShoppingProductCounter";
import { useSelector } from "@hooks";
import { shoppingListProductSelectedSelector } from "@slices/shoppingList";

import ToShoppingListButton from "./ToShoppingListButton";

interface ToShoppingListProps {
  productId: number;
}

const ToShoppingList = ({ productId }: ToShoppingListProps) => {
  const productSelectedCount = useSelector((state) => shoppingListProductSelectedSelector(state, productId));

  return productSelectedCount ? (
    <div style={{ width: 150 }}>
      <ShoppingProductCounter productId={productId} />
    </div>
  ) : (
    <ToShoppingListButton productId={productId} />
  );
};

export default ToShoppingList;
