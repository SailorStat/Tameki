import CarouselAdvertisement from "@components/CarouselAdvertisement";
import { Container, Stack, Typography } from "@mui/material";

import { LayoutMenuHeaderProps } from "../LayoutWithMenuTitle";

const LayoutWithMenuTitleCarousel = ({ title, children }: LayoutMenuHeaderProps) => (
  <Container fixed>
    <Stack paddingTop={1} spacing={2}>
      <Typography variant="h4">{title}</Typography>
      <CarouselAdvertisement />
      {children}
    </Stack>
  </Container>
);

export default LayoutWithMenuTitleCarousel;
