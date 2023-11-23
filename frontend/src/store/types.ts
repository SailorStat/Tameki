export interface Product {
  article: string;
  description: string;
  estimation?: number;
  favorites: boolean;
  id: string;
  images: string[];
  inStock: number;
  labels?: string[];
  price: number;
  reviews: number;
  soldTimes: number;
  title: string;
}
