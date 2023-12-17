import {
  ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon,
  ArrowCircleRightOutlined as ArrowCircleRightOutlinedIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material";

const iconStyles = () => ({
  opacity: 0.5,
  transition: "opacity 200ms linear",
});

const defaultProps = { fontSize: "large" } as const;

export const PrevSlideIcon = styled(ArrowCircleLeftOutlinedIcon)(iconStyles);

PrevSlideIcon.defaultProps = defaultProps;

export const NextSlideIcon = styled(ArrowCircleRightOutlinedIcon)(iconStyles);

NextSlideIcon.defaultProps = defaultProps;
