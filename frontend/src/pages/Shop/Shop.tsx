import CarouselAdvertisement from "@components/CarouselAdvertisement";
import localization from "@localization";
import { Container, Stack, Typography } from "@mui/material";

const Shop = () => (
  <Container fixed>
    <Stack gap={2} paddingTop={1}>
      <Typography variant="h4">{localization.shop}</Typography>
      <CarouselAdvertisement />
    </Stack>
  </Container>
);

export default Shop;
