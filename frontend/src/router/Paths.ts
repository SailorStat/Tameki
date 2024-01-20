export enum PathVariable {
  ShopId = "shopId",
}

const Paths = {
  about: `/:${PathVariable.ShopId}/about`,
  base: "/",
  getAbout: (shopPath: string) => `${shopPath}/about`,
  getGreet: (shopPath: string) => `${shopPath}/greet`,
  getOrder: (shopPath: string) => `${shopPath}/order`,
  greet: `/:${PathVariable.ShopId}/greet`,
  order: `/:${PathVariable.ShopId}/order`,
  shop: `/:${PathVariable.ShopId}`,
  shops: "/shops",
  siteTree: "/siteTree",
};

export default Paths;
