import CarouselAdvertisement from "@components/CarouselAdvertisement";
import ProductTiles from "@components/ProductTiles";
import localization from "@localization";
import { Container, Stack, Typography } from "@mui/material";

const Shop = () => (
  <Container fixed>
    <Stack paddingTop={1} spacing={2}>
      <Typography variant="h4">{localization.shop}</Typography>
      <CarouselAdvertisement />
      <ProductTiles />
    </Stack>
  </Container>
);

export default Shop;
