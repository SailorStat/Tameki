import React from "react";
import Product from "@components/Product";
import { Modal } from "@mui/material";
import SearchParams from "@router/SearchParams";
import { useSearchParams } from "react-router-dom";

import { CloseButton, ProductPaper } from "./ProductModal.styles";

const ProductModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get(SearchParams.ProductId);

  const handleClose = React.useCallback(() => {
    searchParams.delete(SearchParams.ProductId);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <Modal open={!!productId} onClose={handleClose}>
      <ProductPaper sx={{ overflowY: "auto" }}>
        <CloseButton onClick={handleClose} />
        <Product />
      </ProductPaper>
    </Modal>
  );
};

export default ProductModal;
