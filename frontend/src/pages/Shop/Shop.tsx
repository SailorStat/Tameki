import ProductTiles from "@components/ProductTiles";
import LayoutWithMenu from "@layouts/LayoutWithMenu";
import LayoutWithTitleCarousel from "@layouts/LayoutWithTitleCarousel";
import localization from "@localization";

const Shop = () => (
  <LayoutWithMenu>
    <LayoutWithTitleCarousel title={localization.shop}>
      <ProductTiles />
    </LayoutWithTitleCarousel>
  </LayoutWithMenu>
);

export default Shop;
