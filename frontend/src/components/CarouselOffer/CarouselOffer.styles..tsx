import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { styled, Theme } from "@mui/material";

const iconStyles = ({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  opacity: 0.3,
  transition: "opacity 200ms cubic-bezier(1, 0.02, 0.72, 1.01) 0ms",

  "&:hover": {
    opacity: 1,
  },
});

export const PrevSlideIcon = styled(ArrowBackIosNewIcon)(iconStyles);

export const NextSlideIcon = styled(ArrowForwardIosIcon)(iconStyles);
