import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@slices/counter";
import primaryAdvertisementSlice from "@slices/primaryAdvertisement/primaryAdvertisementSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    primaryAdvertisement: primaryAdvertisementSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
