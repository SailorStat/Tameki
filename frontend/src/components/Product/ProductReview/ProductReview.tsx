import { useSelector } from "@hooks";
import { Typography } from "@mui/material";
import { createProductSelector } from "@slices/products";
interface ProductReviewProps {
  productId: number;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  const { reviews } = useSelector(createProductSelector(productId));

  return (
    <Typography variant="subtitle1">
      {"отзывы"}
      {reviews}
    </Typography>
  );
};

export default ProductReview;
