import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Descriptions, Images, Titles } from "./placeholders";
import { Product } from "./types";

const productsSlice = createSlice({
  initialState: [
    {
      article: "111",
      description: Descriptions.WindForest,
      estimation: 99,
      favorites: false,
      id: "1",
      images: [Images.WindForest],
      price: 500,
      reviews: 200,
      soldTimes: 12,
      title: Titles.WindForest,
    },
    {
      article: "222",
      description: Descriptions.Taxi,
      estimation: 90,
      favorites: false,
      id: "2",
      images: [Images.Taxi],
      price: 350,
      reviews: 200,
      soldTimes: 13,
      title: Titles.Taxi,
    },
    {
      article: "333",
      description: Descriptions.AutumnPantsuit,
      estimation: 90,
      favorites: false,
      id: "3",
      images: [Images.AutumnPantsuit],
      price: 1800,
      reviews: 200,
      soldTimes: 45,
      title: Titles.AutumnPantsuit,
    },
    {
      article: "444",
      description: Descriptions.AsphaltAndConcrete,
      estimation: 90,
      favorites: true,
      id: "4",
      images: [Images.AsphaltAndConcrete],
      price: 3600,
      reviews: 200,
      soldTimes: 1,
      title: Titles.AsphaltAndConcrete,
    },
    {
      article: "555",
      description: Descriptions.HelicopterTour,
      estimation: 90,
      favorites: false,
      id: "5",
      images: [Images.HelicopterTour],
      price: 10_000,
      reviews: 200,
      soldTimes: 15,
      title: Titles.HelicopterTour,
    },
    {
      article: "666",
      description: Descriptions.StainedGlass,
      estimation: 90,
      favorites: false,
      id: "6",
      images: [Images.StainedGlass],
      price: 2300,
      reviews: 200,
      soldTimes: 125,
      title: Titles.StainedGlass,
    },
    {
      article: "777",
      description: Descriptions.CreatingAdvertisingPosters,
      estimation: 90,
      favorites: true,
      id: "7",
      images: [Images.CreatingAdvertisingPosters],
      price: 240,
      reviews: 200,
      soldTimes: 5,
      title: Titles.CreatingAdvertisingPosters,
    },
    {
      article: "888",
      description: Descriptions.WeddingSalon,
      estimation: 90,
      favorites: true,
      id: "8",
      images: [Images.WeddingSalon],
      price: 14_750,
      reviews: 200,
      soldTimes: 18,
      title: Titles.WeddingSalon,
    },
  ] satisfies Product[],
  name: "products",
  reducers: {
    toggleFavorite: (state, { payload }: PayloadAction<{ id: Product["id"] }>) => {
      for (const product of state) {
        if (product.id === payload.id) {
          product.favorites = !product.favorites;

          return;
        }
      }
    },
  },
});

export default productsSlice;
