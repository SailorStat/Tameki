import localization from "@localization";
import { Box, Button, Container, Typography } from "@mui/material";

const Shop = () => (
  <Container maxWidth={false}>
    <Typography variant="h4">{localization.shop}</Typography>
  </Container>
);

export default Shop;
