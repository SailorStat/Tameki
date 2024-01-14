const Paths = {
  base: () => "/",
  greet: (path: string) => `${path}/greet`,
  order: (path: string) => `${path}/order`,
  shop: () => `${Paths.base()}/shop`,
  siteTree: () => "/siteTree",
  tameki: () => "/tameki",
};

export default Paths;
