import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  initialState: {
    count: 0,
  },
  name: "counter",
  reducers: {
    decrement: (state) => {
      state.count -= 1;
    },
    increment: (state) => {
      state.count += 1;
    },
  },
});

export default counterSlice;
