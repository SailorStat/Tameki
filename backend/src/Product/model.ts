import { model, Schema } from "mongoose";

export interface Product {
  article: string;
  description: string;
  estimation: number;
  favorites: boolean;
  id: string;
  images: string[];
  inStock: number;
  labels: string[];
  price: number;
  reviews: number;
  soldTimes: number;
  title: string;
}

const productSchema = new Schema({
  article: { require: true, type: String },
  description: { require: true, type: String },
  estimation: { type: Number },
  favorites: { require: true, type: Boolean },
  id: { require: true, type: String },
  images: [{ require: true, type: String }],
  inStock: { require: true, type: Number },
  labels: [{ type: String }],
  price: { require: true, type: Number },
  reviews: { require: true, type: Number },
  soldTimes: { require: true, type: Number },
  title: { require: true, type: String },
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
