import localization from "@localization";
import { ProductSelectedCollection } from "@slices/shoppingList";
import { reduce } from "lodash";

const getOrderMessage = (selectedToOrder: ProductSelectedCollection) => {
  const orderMessage = reduce(
    selectedToOrder,
    (orderMessage, selectedCount, productId) => `${orderMessage} ${productId} - ${selectedCount}`,
    ""
  );

  return `${localization.orderMessageStart}:${orderMessage}`;
};

export default getOrderMessage;
