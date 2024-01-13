import localization from "@localization";
import { Chip } from "@mui/material";
import { Product } from "@store";
import { generateSoftRgbColor } from "@utils";

import DetailWrapper from "./DetailWrapper";

interface ProductLabelsProps {
  labels: Product["labels"];
}

const ProductLabels = ({ labels }: ProductLabelsProps) => {
  return (
    <DetailWrapper direction="row" title={localization.labels}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {labels?.map((label) => (
          <Chip
            key={label}
            label={label}
            style={{
              backgroundColor: generateSoftRgbColor(label),
              maxWidth: "calc(100vw - 120px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        ))}
      </div>
    </DetailWrapper>
  );
};

export default ProductLabels;
