import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@slices/counter";
import primaryAdvertisementSlice from "@slices/primaryAdvertisement/primaryAdvertisementSlice";
import productsSlice from "@slices/products";
import shoppingListSlice from "@slices/shoppingList/shoppingListSlice";
import userCreateSlice from "@slices/userCreate/slice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    primaryAdvertisement: primaryAdvertisementSlice.reducer,
    products: productsSlice.reducer,
    shoppingList: shoppingListSlice.reducer,
    userCreate: userCreateSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
