import { RootState } from "@src/store";

const productsSelector = (state: RootState) => state.products;

export { productsSelector };
