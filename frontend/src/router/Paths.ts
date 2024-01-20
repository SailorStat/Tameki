export enum PathVariable {
  ShopId = "shopId",
}

const Paths = {
  about: `/:${PathVariable.ShopId}/about`,
  base: "/",
  getAbout: (shopPath: string) => `${shopPath}/about`,
  getGreet: (shopPath: string) => `${shopPath}/greet`,
  getShoppingList: (shopPath: string) => `${shopPath}/shoppingList`,
  greet: `/:${PathVariable.ShopId}/greet`,
  shop: `/:${PathVariable.ShopId}`,
  shoppingList: `/:${PathVariable.ShopId}/shoppingList`,
  shops: "/shops",
  siteTree: "/siteTree",
};

export default Paths;
