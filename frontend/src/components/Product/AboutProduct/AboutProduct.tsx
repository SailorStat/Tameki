import ToShoppingList from "@components/ToShoppingList";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Stack, Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
import TextFieldCopy from "@ui/TextFieldCopy";
import { formatPrice } from "@utils";

import DetailWrapper from "./DetailWrapper";
import ProductLabels from "./ProductLabels";
import ProductStatsInfo from "./ProductStatsInfo";

interface AboutProductProps {
  productId: string;
}

const AboutProduct = ({ productId }: AboutProductProps) => {
  const { article, description, estimation, inStock, labels, price, soldTimes } = useSelector(
    createProductSelector(productId)
  );

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Stack alignItems="center" direction="row" flexWrap="wrap-reverse" gap={1} justifyContent="space-between">
        <ProductStatsInfo estimation={estimation} soldTimes={soldTimes} />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignItems: "baseline", display: "flex" }}>
            <Typography variant="h4">{formatPrice(price)}</Typography>
            <Typography variant="caption">{localization.perUnit}</Typography>
          </div>
          <div style={{ padding: "6px 0", position: "relative", width: "min-content" }}>
            <Typography
              sx={{ left: "50%", position: "absolute", textWrap: "nowrap", top: -10, transform: "translateX(-50%)" }}
              variant="caption"
            >
              {localization.inStock}
              {": "}
              {inStock}
            </Typography>
            <ToShoppingList productId={productId} />
          </div>
        </div>
      </Stack>
      <DetailWrapper direction="column" title={localization.description}>
        <Typography sx={{ whiteSpace: "pre-line" }} variant="subtitle1">
          {description}
        </Typography>
      </DetailWrapper>
      <DetailWrapper direction="row" title={localization.article}>
        <TextFieldCopy
          fullWidth={false}
          multiline={false}
          size="small"
          style={{ width: "130px" }}
          value={article}
          variant="standard"
        />
      </DetailWrapper>
      <ProductLabels labels={labels} />
    </div>
  );
};

export default AboutProduct;
