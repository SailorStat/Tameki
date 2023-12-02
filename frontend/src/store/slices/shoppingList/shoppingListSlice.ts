import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types";

interface ToRemoveProduct {
  count: number;
  productId: string;
}

interface ShoppingListState {
  productIdToOrderCollection: Record<Product["id"], boolean>;
  productsSelectedCollection: Record<Product["id"], number>;
  productToRemove: ToRemoveProduct | null;
  shopListProductIds: Product["id"][];
}

const initialState: ShoppingListState = {
  productIdToOrderCollection: {},
  productsSelectedCollection: {},
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

      state.productIdToOrderCollection[productId] = true;

      if (count) {
        state.productsSelectedCollection[productId] = count;
      } else {
        state.productsSelectedCollection[productId] ??= 0;
        state.productsSelectedCollection[productId] += 1;
      }
    },

    removeProduct: (state) => {
      state.productToRemove = null;
    },
    toRemoveProduct: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.shopListProductIds = state.shopListProductIds.filter(
        (shopListProductId) => productId !== shopListProductId
      );

      state.productToRemove = { count: state.productsSelectedCollection[productId], productId };
      delete state.productsSelectedCollection[productId];
      delete state.productIdToOrderCollection[productId];
    },

    changeProductCount: (
      state,
      { payload: { productId, count } }: PayloadAction<{ count: number; productId: Product["id"] }>
    ) => {
      state.productsSelectedCollection[productId] = count;
      state.productIdToOrderCollection[productId] = !!count;
    },
    decrementProductCount: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productsSelectedCollection[productId] -= 1;
      state.productIdToOrderCollection[productId] = !!state.productsSelectedCollection[productId];
    },
    incrementProductCount: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productsSelectedCollection[productId] += 1;
      state.productIdToOrderCollection[productId] = true;
    },

    toggleProductToOrder: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.productIdToOrderCollection[productId] = !state.productIdToOrderCollection[productId];
    },
  },
});

export default shoppingListSlice;
