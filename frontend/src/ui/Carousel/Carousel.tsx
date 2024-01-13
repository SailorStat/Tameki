import "./styles.css";
import React from "react";
import { alpha, useTheme } from "@mui/material";
import NukaCarousel, { CarouselProps } from "nuka-carousel";

import { NextSlideIcon, PrevSlideIcon } from "./Carousel.styles";

const buttonStyle = { height: "100%" };

const Carousel = ({ defaultControlsConfig, style, ...props }: CarouselProps) => {
  const carouselId = React.useId();
  const { palette } = useTheme();

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <NukaCarousel
        autoplay
        autoplayInterval={4000}
        carouselId={carouselId}
        defaultControlsConfig={{
          nextButtonStyle: buttonStyle,
          nextButtonText: <NextSlideIcon />,
          pagingDotsClassName: "offer-dots",
          pagingDotsStyle: { fill: alpha(palette.primary.main, 0.6), margin: "5px" },
          prevButtonStyle: buttonStyle,
          prevButtonText: <PrevSlideIcon />,
          ...defaultControlsConfig,
        }}
        dragThreshold={0.1}
        enableKeyboardControls
        style={{ maxWidth: "calc(100vw - 32px)", ...style }}
        wrapAround
        {...props}
      />
    </div>
  );
};

export default Carousel;
