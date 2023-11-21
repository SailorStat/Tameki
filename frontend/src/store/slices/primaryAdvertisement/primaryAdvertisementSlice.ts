import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Image1 from "./images/1.png";
import Image2 from "./images/2.png";
import Image3 from "./images/3.jpg";
import { Advertisement } from "./types";

const primaryAdvertisementSlice = createSlice({
  initialState: {
    advertisements: [
      {
        id: 1,
        image: Image1,
        title: "Заходи в Bootcamp_RU",
      },
      {
        id: 2,
        image: Image2,
        title: "Бесконечная энергия в Ever Merge",
      },
      {
        id: 3,
        image: Image3,
        title: "Играй в Ever Merge",
      },
    ] satisfies Advertisement[],
  },
  name: "primaryAdvertisement",
  reducers: {
    removeAdvertisement: (state, { payload }: PayloadAction<{ id: Advertisement["id"] }>) => {
      state.advertisements = state.advertisements.filter(({ id }) => id === payload.id);
    },
  },
});

export default primaryAdvertisementSlice;
