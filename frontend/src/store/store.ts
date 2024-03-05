import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@slices/counter";
import primaryAdvertisementSlice from "@slices/primaryAdvertisement";
import productsSlice from "@slices/products";
import registrationSlice from "@slices/registration/slice";
import shoppingListSlice from "@slices/shoppingList";
import userSlice from "@slices/user/slice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    primaryAdvertisement: primaryAdvertisementSlice.reducer,
    products: productsSlice.reducer,
    registration: registrationSlice.reducer,
    shoppingList: shoppingListSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
