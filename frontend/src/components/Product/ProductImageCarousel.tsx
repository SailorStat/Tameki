import { useProductId, useSelector } from "@hooks";
import { useMediaQuery, useTheme } from "@mui/material";
import { createProductSelector } from "@slices/products";
import Carousel from "@ui/Carousel";

const ProductImageCarousel = () => {
  const productId = useProductId();
  const theme = useTheme();
  const { title, images } = useSelector(createProductSelector(productId!));
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Carousel>
      {images.map((image) => (
        <div key={image} style={{ aspectRatio: upMd ? "3 / 4" : "1 / 1", minHeight: 80 }}>
          <img alt={title} src={image} style={{ height: "100%", objectFit: "cover", width: "100%" }} />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductImageCarousel;
