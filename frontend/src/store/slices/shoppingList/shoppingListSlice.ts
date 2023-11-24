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
    changeProductCount: (state, { payload: { id, count } }: PayloadAction<{ count: number; id: Product["id"] }>) => {
      state.productsSelectedCollection[id] = count;
      state.productIdToOrderCollection[id] = !!count;
    },
    hideProduct: (state, { payload: productId }: PayloadAction<Product["id"]>) => {
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
    toggleProductToOrder: (state, { payload: { id } }: PayloadAction<{ id: Product["id"] }>) => {
      state.productIdToOrderCollection[id] = !state.productIdToOrderCollection[id];
    },
  },
});

export default shoppingListSlice;
