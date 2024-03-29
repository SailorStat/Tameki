import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types";
import { Descriptions, Images, Titles } from "./placeholders";

const initialState: Record<Product["id"], Product> = {
  1: {
    article: "46d36fa2",
    description: Descriptions.WeddingSalon,
    estimation: 90,
    favorites: true,
    id: 1,
    images: [Images.WeddingSalon],
    inStock: 12,
    labels: [],
    price: 14_750,
    reviews: 200,
    soldTimes: 18,
    title: Titles.WeddingSalon,
  },
  2: {
    article: "962d651a",
    description: Descriptions.StainedGlass,
    estimation: 90,
    favorites: false,
    id: 2,
    images: [Images.StainedGlass],
    inStock: 12,
    labels: [],
    price: 2300,
    reviews: 200,
    soldTimes: 125,
    title: Titles.StainedGlass,
  },
  3: {
    article: "99720f1a",
    description: Descriptions.WindForest,
    estimation: 99,
    favorites: false,
    id: 3,
    images: [Images.WindForest],
    inStock: 12,
    labels: [],
    price: 500,
    reviews: 200,
    soldTimes: 12,
    title: Titles.WindForest,
  },
  4: {
    article: "99720f2a",
    description: Descriptions.Taxi,
    estimation: 90,
    favorites: false,
    id: 4,
    images: [Images.Taxi],
    inStock: 12,
    labels: [],
    price: 350,
    reviews: 200,
    soldTimes: 13,
    title: Titles.Taxi,
  },
  5: {
    article: "12699858",
    description: Descriptions.AutumnPantsuit,
    estimation: 90,
    favorites: false,
    id: 5,
    images: [Images.AutumnPantsuit],
    inStock: 12,
    labels: [],
    price: 1800,
    reviews: 200,
    soldTimes: 45,
    title: Titles.AutumnPantsuit,
  },
  6: {
    article: "b7969abe",
    description: Descriptions.CreatingAdvertisingPosters,
    estimation: 90,
    favorites: true,
    id: 6,
    images: [Images.CreatingAdvertisingPosters],
    inStock: 12,
    labels: [],
    price: 240,
    reviews: 200,
    soldTimes: 5,
    title: Titles.CreatingAdvertisingPosters,
  },
  7: {
    article: "d1149932",
    description: Descriptions.AsphaltAndConcrete,
    estimation: 90,
    favorites: true,
    id: 7,
    images: [Images.AsphaltAndConcrete],
    inStock: 12,
    labels: [],
    price: 3600,
    reviews: 200,
    soldTimes: 1,
    title: Titles.AsphaltAndConcrete,
  },
  12: {
    article: "40e3fe57",
    description: Descriptions.HelicopterTour,
    estimation: 90,
    favorites: false,
    id: 1234,
    images: [Images.HelicopterTour, Images.HelicopterTour, Images.HelicopterTour, Images.HelicopterTour],
    inStock: 12,
    labels: ["любо", "дорого", "богато", "скидка", "красноволосым скидка на доствку"],
    price: 10_000,
    reviews: 200,
    soldTimes: 15,
    title: Titles.HelicopterTour,
  },
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    toggleFavorite: (state, { payload }: PayloadAction<{ productId: Product["id"] }>) => {
      state[payload.productId].favorites = !state[payload.productId].favorites;
    },
  },
});

export default productsSlice;
