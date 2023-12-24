import {
  RecommendOutlined as RecommendOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { Product } from "@store";
import { formatEstimation } from "@utils";

import ProductStatInfo from "./ProductStatInfo";

interface ProductStatsInfoProps {
  estimation: Product["estimation"];
  soldTimes: Product["soldTimes"];
}

const ProductStatsInfo = ({ estimation, soldTimes }: ProductStatsInfoProps) => {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill, 65px)",
      }}
    >
      <ProductStatInfo count={formatEstimation(estimation)} Icon={RecommendOutlinedIcon} />
      <ProductStatInfo count={soldTimes} Icon={ShoppingCartOutlinedIcon} />
    </div>
  );
};

export default ProductStatsInfo;
