import { createSelector } from "@reduxjs/toolkit";
import { productCollectionSelector } from "@slices/products";
import { Product, RootState } from "@src/store";
import { reduce } from "lodash";

const shoppingListProductIdsSelector = (state: RootState) => state.shoppingList.shopListProductIds;

const shoppingListProductSelectedCollectionSelector = (state: RootState) =>
  state.shoppingList.productsSelectedCollection;

const shoppingListProductToRemoveSelector = (state: RootState) => state.shoppingList.productToRemove;

const shoppingListProductIdsToOrderSelector = (state: RootState) => state.shoppingList.productIdIsInOrderCollection;

const selectProductId = (_: RootState, productId: Product["id"]) => productId;

const shoppingListProductsSelector = createSelector(
  [productCollectionSelector, shoppingListProductIdsSelector],
  (productCollection, shoppingListProductIds) => shoppingListProductIds.map((productId) => productCollection[productId])
);

const shoppingListProductsCountSelector = createSelector(
  [shoppingListProductSelectedCollectionSelector],
  (productsSelectedCollection) =>
    reduce(productsSelectedCollection, (allSelectedCount, selectedCount) => allSelectedCount + selectedCount, 0)
);

const shoppingListLengthSelector = createSelector([shoppingListProductIdsSelector], (productIds) => productIds.length);

const shoppingListProductSelectedSelector = createSelector(
  [shoppingListProductSelectedCollectionSelector, selectProductId],
  (productsSelectedCollection, productId) => productsSelectedCollection[productId] ?? 0
);

const shoppingListIsInOrderProductSelector = createSelector(
  [shoppingListProductIdsToOrderSelector, selectProductId],
  (productIdsToOrder, productId) => productIdsToOrder[productId]
);

const shoppingListTotalCostSelector = createSelector(
  [
    shoppingListProductIdsSelector,
    shoppingListProductSelectedCollectionSelector,
    shoppingListProductIdsToOrderSelector,
    productCollectionSelector,
  ],
  (shoppingListProductIds, selectedCollection, toOrderCollection, productCollection) =>
    shoppingListProductIds.reduce(
      (totalCost, productId) =>
        totalCost +
        (selectedCollection[productId] && toOrderCollection[productId]
          ? productCollection[productId].price * selectedCollection[productId]
          : 0),
      0
    )
);

export {
  shoppingListProductIdsSelector,
  shoppingListProductSelectedCollectionSelector,
  shoppingListProductIdsToOrderSelector,
  shoppingListProductToRemoveSelector,
  shoppingListProductsSelector,
  shoppingListIsInOrderProductSelector,
  shoppingListLengthSelector,
  shoppingListProductsCountSelector,
  shoppingListProductSelectedSelector,
  shoppingListTotalCostSelector,
};
