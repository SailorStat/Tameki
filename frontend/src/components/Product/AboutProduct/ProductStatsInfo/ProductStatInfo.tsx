import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ProductTileStatInfoProps {
  count?: number | string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & { muiName: string };
}

const ProductStatInfo = ({ count, Icon }: ProductTileStatInfoProps) => {
  return count ? (
    <Stack alignItems="center" direction="row" gap={0.25}>
      <Icon fontSize="large" />
      <Typography display="block" lineHeight={1} textAlign="center">
        {count}
      </Typography>
    </Stack>
  ) : null;
};

export default ProductStatInfo;
