import { createSelector } from "@reduxjs/toolkit";
import { Product, RootState } from "@src/store";
import { reduce } from "lodash";

const shoppingListProductsSelector = (state: RootState) => state.shoppingList.products;

const shoppingListProductsSelectedCollectionSelector = (state: RootState) =>
  state.shoppingList.productsSelectedCollection;

const shoppingListProductsHiddenProductIdsSelector = (state: RootState) => state.shoppingList.hiddenProductIds;

const selectProductId = (state: RootState, productId: Product["id"]) => productId;

const productsInShoppingListSelector = createSelector(
  [shoppingListProductsSelectedCollectionSelector],
  (productsSelectedCollection) =>
    reduce(productsSelectedCollection, (AllSelectedCount, selectedCount) => (AllSelectedCount += selectedCount), 0)
);

const shoppingListProductSelectedSelector = createSelector(
  [shoppingListProductsSelectedCollectionSelector, selectProductId],
  (productsSelectedCollection, productId) => productsSelectedCollection[productId]
);

const shoppingListIsHiddenProductSelector = createSelector(
  [shoppingListProductsHiddenProductIdsSelector, selectProductId],
  (hiddenProductIds, productId) => hiddenProductIds.includes(productId)
);

export {
  shoppingListProductsSelector,
  productsInShoppingListSelector,
  shoppingListIsHiddenProductSelector,
  shoppingListProductSelectedSelector,
  shoppingListProductsSelectedCollectionSelector,
};
