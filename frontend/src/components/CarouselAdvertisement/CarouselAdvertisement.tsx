import "./styles.css";
import React from "react";
import { alpha, useTheme } from "@mui/material";
import { primaryAdvertisementsSelector } from "@slices/primaryAdvertisement";
import useSelector from "@src/hooks/useSelector";
import Carousel from "nuka-carousel";

import { NextSlideIcon, PrevSlideIcon } from "./CarouselAdvertisement.styles.";

const buttonStyle = { height: "100%" };

const CarouselAdvertisement = () => {
  const advertisements = useSelector(primaryAdvertisementsSelector);
  const carouselId = React.useId();
  const { palette } = useTheme();

  return (
    <Carousel
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
      }}
      dragThreshold={0.1}
      enableKeyboardControls
      style={{ maxWidth: "calc(100vw - 32px)" }}
      wrapAround
    >
      {advertisements.map(({ id, image, title }) => (
        <div key={id} style={{ aspectRatio: "8 / 1", minHeight: 80 }}>
          <img alt={title} src={image} style={{ height: "100%", objectFit: "cover", width: "100%" }} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselAdvertisement;
