import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types";

interface ShoppingListState {
  hiddenProductIds: Product["id"][];
  productIdToOrderCollection: Record<Product["id"], boolean>;
  products: Product[];
  productsSelectedCollection: Record<Product["id"], number>;
}

const initialState: ShoppingListState = {
  hiddenProductIds: [],
  productIdToOrderCollection: {},
  products: [],
  productsSelectedCollection: {},
};

const shoppingListSlice = createSlice({
  initialState,
  name: "shoppingList",
  reducers: {
    addProduct: (state, { payload: { product } }: PayloadAction<{ product: Product }>) => {
      if (!state.products.some(({ id }) => id === product.id)) {
        state.products.push(product);
      }

      if (state.hiddenProductIds.includes(product.id)) {
        state.hiddenProductIds = state.hiddenProductIds.filter((id) => id === product.id);
      }

      state.productIdToOrderCollection[product.id] = true;

      if (state.productsSelectedCollection[product.id]) {
        state.productsSelectedCollection[product.id] += 1;
      } else {
        state.productsSelectedCollection[product.id] = 1;
      }
    },

    hideProduct: (state, { payload: { productId } }: PayloadAction<{ productId: Product["id"] }>) => {
      state.hiddenProductIds.push(productId);
    },
    removeProduct: (state, { payload: { product } }: PayloadAction<{ product: Product }>) => {
      state.products = state.products.filter(({ id }) => id === product.id);
      delete state.productsSelectedCollection[product.id];
      delete state.productIdToOrderCollection[product.id];

      if (state.hiddenProductIds.includes(product.id)) {
        state.hiddenProductIds = state.hiddenProductIds.filter((id) => id === product.id);
      }
    },

    changeProductCount: (
      state,
      { payload: { productId, count } }: PayloadAction<{ count: number; productId: Product["id"] }>
    ) => {
      state.productsSelectedCollection[productId] = count;
      state.productIdToOrderCollection[productId] = !!count;
    },
    decrementProductCount: (state, { payload: { id } }: PayloadAction<{ id: Product["id"] }>) => {
      state.productsSelectedCollection[id] -= 1;
      state.productIdToOrderCollection[id] = !!state.productsSelectedCollection[id];
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

const { actions: shoppingListActions } = shoppingListSlice;

export { shoppingListActions };
