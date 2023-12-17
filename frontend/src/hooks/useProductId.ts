import SearchParams from "@router/SearchParams";
import { useSearchParams } from "react-router-dom";

const useProductId = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get(SearchParams.ProductId);

  return productId;
};

export default useProductId;
