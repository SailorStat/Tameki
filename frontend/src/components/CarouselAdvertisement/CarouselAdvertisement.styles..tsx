import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { styled, Theme } from "@mui/material";

const iconStyles = ({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  opacity: 0.3,
  padding: "0 1vw",
  transition: "opacity 200ms linear",
});

const defaultProps = { fontSize: "large" } as const;

export const PrevSlideIcon = styled(ArrowBackIosNewIcon)(iconStyles);

PrevSlideIcon.defaultProps = defaultProps;

export const NextSlideIcon = styled(ArrowForwardIosIcon)(iconStyles);

NextSlideIcon.defaultProps = defaultProps;
