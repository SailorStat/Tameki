import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { Checkbox, CheckboxProps } from "@mui/material";

export interface CheckboxFavoriteProps
  extends Omit<CheckboxProps, "checked" | "checkedIcon" | "color" | "icon" | "id" | "onClick"> {
  checked: boolean;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CheckboxFavorite = (props: CheckboxFavoriteProps) => (
  <Checkbox checkedIcon={<FavoriteIcon />} icon={<FavoriteBorderIcon />} {...props} />
);

export default CheckboxFavorite;
