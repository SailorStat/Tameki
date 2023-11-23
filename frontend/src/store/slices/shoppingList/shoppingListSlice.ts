import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types";

interface ShoppingListState {
  hiddenProductIds: Product["id"][];
  products: Product[];
  productsSelectedCollection: Record<string, number>;
}

const initialState: ShoppingListState = {
  hiddenProductIds: [],
  products: [],
  productsSelectedCollection: {},
};

const shoppingListSlice = createSlice({
  initialState,
  name: "shoppingList",
  reducers: {
    addProduct: (state, { payload: { product, position } }: PayloadAction<{ position?: number; product: Product }>) => {
      if (!state.products.some(({ id }) => id === product.id)) {
        position !== undefined ? state.products.splice(position, 0, product) : state.products.push(product);
      }

      if (state.productsSelectedCollection[product.id]) {
        state.productsSelectedCollection[product.id] += 1;
      } else {
        state.productsSelectedCollection[product.id] = 1;
      }
    },
    changeProductCount: (state, { payload: { id, count } }: PayloadAction<{ count: number; id: Product["id"] }>) => {
      state.productsSelectedCollection[id] = count;
    },
    hideProduct: (state, { payload: productId }: PayloadAction<Product["id"]>) => {
      state.hiddenProductIds.push(productId);
    },
    removeProduct: (state, { payload: { product } }: PayloadAction<{ product: Product }>) => {
      state.products = state.products.filter(({ id }) => id === product.id);
      delete state.productsSelectedCollection[product.id];
      state.hiddenProductIds = state.hiddenProductIds.filter((id) => id === product.id);
    },
  },
});

export default shoppingListSlice;
