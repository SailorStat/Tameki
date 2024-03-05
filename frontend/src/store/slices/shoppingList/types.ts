import { Product } from "@src/store";

export interface ToRemoveProduct {
  count: number;
  productId: number;
}

export type ProductIdIsInOrderCollection = Record<Product["id"], boolean>;

export type ProductSelectedCollection = Record<Product["id"], number>;

export interface ShoppingListState {
  productIdIsInOrderCollection: ProductIdIsInOrderCollection;
  productSelectedCollection: ProductSelectedCollection;
  productToRemove: ToRemoveProduct | null;
  shopListProductIds: Product["id"][];
}
