import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { includes } from "lodash";

import { Product } from "../../types";
import { ShoppingListState } from "./types";

const initialState: ShoppingListState = {
  productIdIsInOrderCollection: {},
  productSelectedCollection: {},
  productToRemove: null,
  shopListProductIds: [],
};

const shoppingListSlice = createSlice({
  initialState,
  name: "shoppingList",
  reducers: {
    addProduct: (
      state,
      { payload: { productId, count } }: PayloadAction<{ count?: number; productId: Product["id"] }>
    ) => {
      if (!state.shopListProductIds.includes(productId)) {
        state.shopListProductIds.push(productId);
      }

      state.productToRemove?.productId === productId && (state.productToRemove = null);

      state.productIdIsInOrderCollection[productId] = true;

      if (count) {
        state.productSelectedCollection[productId] = count;
      } else {
        state.productSelectedCollection[productId] ??= 0;
        state.productSelectedCollection[productId] += 1;
      }
    },

    removeProduct: (state) => {
      state.productToRemove = null;
    },
    toRemoveProduct: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.shopListProductIds = state.shopListProductIds.filter(
        (shopListProductId) => productId !== shopListProductId
      );

      state.productToRemove = { count: state.productSelectedCollection[productId], productId };
      delete state.productSelectedCollection[productId];
      delete state.productIdIsInOrderCollection[productId];
    },

    changeProductCount: (
      state,
      { payload: { productId, count } }: PayloadAction<{ count: number; productId: Product["id"] }>
    ) => {
      state.productSelectedCollection[productId] = count;
      state.productIdIsInOrderCollection[productId] = !!count;
    },
    decrementProductCount: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productSelectedCollection[productId] -= 1;
      state.productIdIsInOrderCollection[productId] = !!state.productSelectedCollection[productId];
    },
    incrementProductCount: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productSelectedCollection[productId] += 1;
      state.productIdIsInOrderCollection[productId] = true;
    },

    toggleProductIdIsInOrder: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productIdIsInOrderCollection[productId] = !state.productIdIsInOrderCollection[productId];
    },
    toggleProductsIsInOrder: (state) => {
      const hasUnordered = includes(state.productIdIsInOrderCollection, false);

      state.shopListProductIds.forEach((productId) => {
        state.productIdIsInOrderCollection[productId] = hasUnordered;
      });
    },
  },
});

export default shoppingListSlice;
