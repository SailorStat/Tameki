import mongoose from "mongoose";

import { URL_PRODUCT_ID_PARAM } from "./constants.js";
import productService from "./service.js";

class ProductController {
  create = async (request, response) => {
    try {
      const product = await productService.create({ ...request.body, ...request.files });

      return response.json(product);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  getAll = async (_, response) => {
    try {
      const product = await productService.getAll();

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  getOne = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const product = await productService.getOne(productId);

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  update = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const updatedProduct = await productService.update({ ...request.body, id: productId });

      return response.json(updatedProduct);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  delete = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const product = await productService.delete(productId);

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };
}

const productController = new ProductController();

export default productController;
