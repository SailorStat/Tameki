import ProductTiles from "@components/ProductTiles";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import LayoutWithTitleCarousel from "@layouts/LayoutWithTitleCarousel";
import localization from "@localization";

const Shop = () => (
  <LayoutWithAppBar>
    <LayoutWithTitleCarousel title={localization.shop}>
      <ProductTiles />
    </LayoutWithTitleCarousel>
  </LayoutWithAppBar>
);

export default Shop;
