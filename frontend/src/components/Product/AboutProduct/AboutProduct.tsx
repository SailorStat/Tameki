import ToShoppingList from "@components/ToShoppingList";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Tag as TagIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
import TextFieldCopy from "@ui/TextFieldCopy";
import { formatPrice } from "@utils";
import { capitalize } from "lodash";

import ProductStatsInfo from "./ProductStatsInfo";

interface AboutProductProps {
  productId: string;
}

const AboutProduct = ({ productId }: AboutProductProps) => {
  const { article, description, estimation, inStock, labels, price, reviews, soldTimes } = useSelector(
    createProductSelector(productId)
  );

  return (
    <div style={{ display: "grid", gap: 12, paddingRight: 20 }}>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: 8,
          gridTemplateColumns: "max-content 1fr max-content max-content",
        }}
      >
        <ProductStatsInfo estimation={estimation} soldTimes={soldTimes} />
        <div />
        <div style={{ alignItems: "baseline", display: "flex" }}>
          <Typography variant="h4">{formatPrice(price)}</Typography>
          <Typography variant="caption">{localization.perUnit}</Typography>
        </div>
        <div style={{ position: "relative", width: "min-content" }}>
          <Typography
            sx={{ left: "50%", position: "absolute", textWrap: "nowrap", top: -16, transform: "translateX(-50%)" }}
            variant="caption"
          >
            {localization.inStock}
            {": "}
            {inStock}
          </Typography>
          <ToShoppingList productId={productId} />
        </div>
      </div>
      <div>
        <Typography fontWeight={500} variant="subtitle1">
          {capitalize(localization.description)}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }} variant="subtitle1">
          {description}
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <Typography fontWeight={500} paddingRight={1} variant="subtitle1">
          {capitalize(localization.article)}
          {":"}
        </Typography>
        <TextFieldCopy fullWidth={false} size="small" value={article} variant="standard" />
      </div>
      <Typography variant="subtitle1">
        {"метки"}
        {labels}
      </Typography>
      <Typography variant="subtitle1">
        {"отзывы"}
        {reviews}
      </Typography>
    </div>
  );
};

export default AboutProduct;
