import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@slices/counter";
import primaryAdvertisementSlice from "@slices/primaryAdvertisement/primaryAdvertisementSlice";
import productsSlice from "@slices/products";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    primaryAdvertisement: primaryAdvertisementSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
