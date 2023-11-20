import CarouselOffer from "@components/CarouselOffer";
import localization from "@localization";
import { Container, Typography } from "@mui/material";

const Shop = () => (
  <Container maxWidth={false}>
    <Typography variant="h4">{localization.shop}</Typography>
    <CarouselOffer />
  </Container>
);

export default Shop;
