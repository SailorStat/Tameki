import { createSelector } from "@reduxjs/toolkit";
import { Product, RootState } from "@src/store";
import { reduce } from "lodash";

const shoppingListProductsSelector = (state: RootState) => state.shoppingList.products;

const shoppingListProductsSelectedCollectionSelector = (state: RootState) =>
  state.shoppingList.productsSelectedCollection;

const shoppingListHiddenProductIdsSelector = (state: RootState) => state.shoppingList.hiddenProductIds;

const shoppingListProductIdsToOrderSelector = (state: RootState) => state.shoppingList.productIdToOrderCollection;

const selectProductId = (state: RootState, productId: Product["id"]) => productId;

const shoppingListLengthSelector = createSelector(
  [shoppingListProductsSelectedCollectionSelector],
  (productsSelectedCollection) =>
    reduce(productsSelectedCollection, (AllSelectedCount, selectedCount) => (AllSelectedCount += selectedCount), 0)
);

const shoppingListProductSelectedSelector = createSelector(
  [shoppingListProductsSelectedCollectionSelector, selectProductId],
  (productsSelectedCollection, productId) => productsSelectedCollection[productId]
);

const shoppingListIsHiddenProductSelector = createSelector(
  [shoppingListHiddenProductIdsSelector, selectProductId],
  (hiddenProductIds, productId) => hiddenProductIds.includes(productId)
);

const shoppingListIsOrderedProductSelector = createSelector(
  [shoppingListProductIdsToOrderSelector, selectProductId],
  (productIdsToOrder, productId) => productIdsToOrder[productId]
);

export {
  shoppingListProductsSelector,
  shoppingListProductsSelectedCollectionSelector,
  shoppingListProductIdsToOrderSelector,
  shoppingListIsOrderedProductSelector,
  shoppingListLengthSelector,
  shoppingListIsHiddenProductSelector,
  shoppingListProductSelectedSelector,
};
