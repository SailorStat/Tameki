import { Router } from "express";

import { PRODUCT_BASE_URL, URL_PRODUCT_ID_PARAM } from "./constants.js";
import productController from "./controller.js";
import { Product } from "./model.js";

const productRouter = Router();

productRouter.post<
  typeof PRODUCT_BASE_URL,
  object,
  any,
  Pick<Product, "description" | "images" | "labels" | "price" | "title">
>(PRODUCT_BASE_URL, productController.create);
productRouter.get(PRODUCT_BASE_URL, productController.getAll);
productRouter.get(`${PRODUCT_BASE_URL}/:${URL_PRODUCT_ID_PARAM}`, productController.getOne);
productRouter.put(`${PRODUCT_BASE_URL}/:${URL_PRODUCT_ID_PARAM}`, productController.update);
productRouter.delete(`${PRODUCT_BASE_URL}/:${URL_PRODUCT_ID_PARAM}`, productController.delete);

export default productRouter;
