import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ProductTileStatInfoProps {
  count?: number | string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & { muiName: string };
}

const ProductTileStatInfo = ({ count, Icon }: ProductTileStatInfoProps) => {
  return count ? (
    <Stack alignItems="center" direction="row" gap={0.25}>
      <Icon fontSize="small" />
      <Typography display="block" lineHeight={1} textAlign="center" variant="caption">
        {count}
      </Typography>
    </Stack>
  ) : null;
};

export default ProductTileStatInfo;
