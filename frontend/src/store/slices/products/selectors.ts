import { createSelector } from "@reduxjs/toolkit";
import { Product, RootState } from "@src/store";

const productCollectionSelector = (state: RootState) => state.products;

const productIdSelector = (_: RootState, productId: Product["id"]) => productId;

const productSelector = createSelector(
  [productCollectionSelector, productIdSelector],
  (productCollection, productId) => productCollection[productId]
);

export { productCollectionSelector, productSelector };
