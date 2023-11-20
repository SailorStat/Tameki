import "./styles.css";
import React from "react";
import { useTheme } from "@mui/material";
import Carousel from "nuka-carousel";

import { NextSlideIcon, PrevSlideIcon } from "./CarouselOffer.styles.";
import Image1 from "./images/1.png";
import Image2 from "./images/2.png";
import Image3 from "./images/3.jpg";

const CarouselOffer = () => {
  const carouselId = React.useId();
  const { palette } = useTheme();

  return (
    <Carousel
      autoplay
      autoplayInterval={4000}
      carouselId={carouselId}
      defaultControlsConfig={{
        nextButtonText: <NextSlideIcon />,
        pagingDotsClassName: "offer-dots",
        pagingDotsStyle: { fill: palette.primary.main, margin: "5px" },
        prevButtonText: <PrevSlideIcon />,
      }}
      dragThreshold={0.1}
      enableKeyboardControls
      wrapAround
    >
      {[Image1, Image2, Image3].map((image, index) => (
        <img alt="" key={index} src={image} style={{ aspectRatio: "10 / 1", minHeight: 80, width: "100%" }} />
      ))}
    </Carousel>
  );
};

export default CarouselOffer;
