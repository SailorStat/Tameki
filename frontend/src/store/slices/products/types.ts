export interface Product {
  article: string;
  description: string;
  estimation?: number;
  favorites: boolean;
  id: string;
  images: string[];
  labels?: string[];
  price: number;
  reviews: number;
  soldTimes: number;
  title: string;
}
