import ProductTiles from "@components/ProductTiles";
import localization from "@localization";
import LayoutWithMenuTitleCarousel from "@src/layouts/LayoutWithMenuTitleCarousel";

const Shop = () => (
  <LayoutWithMenuTitleCarousel title={localization.shop}>
    <ProductTiles />
  </LayoutWithMenuTitleCarousel>
);

export default Shop;
