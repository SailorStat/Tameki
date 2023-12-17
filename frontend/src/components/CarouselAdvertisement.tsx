import { primaryAdvertisementsSelector } from "@slices/primaryAdvertisement";
import { useSelector } from "@src/hooks";
import Carousel from "@ui/Carousel";

const CarouselAdvertisement = () => {
  const advertisements = useSelector(primaryAdvertisementsSelector);

  return (
    <Carousel>
      {advertisements.map(({ id, image, title }) => (
        <div key={id} style={{ aspectRatio: "8 / 1", minHeight: 80 }}>
          <img alt={title} src={image} style={{ height: "100%", objectFit: "cover", width: "100%" }} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselAdvertisement;
