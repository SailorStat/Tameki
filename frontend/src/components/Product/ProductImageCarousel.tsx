import { useProductId, useSelector } from "@hooks";
import { createProductSelector } from "@slices/products";
import Carousel from "@ui/Carousel";

const ProductImageCarousel = () => {
  const productId = useProductId();
  const { title, images } = useSelector(createProductSelector(productId!));

  return (
    <div>
      <Carousel>
        {images.map((image) => (
          <div key={image} style={{ aspectRatio: "3 / 4", minHeight: 80 }}>
            <img alt={title} src={image} style={{ height: "100%", objectFit: "cover", width: "100%" }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;
