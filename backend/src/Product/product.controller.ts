import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

import { PRODUCT_BASE_URL, URL_PRODUCT_ID_PARAM } from "./constants.js";
import ProductService from "./product.service.js";

@Controller(PRODUCT_BASE_URL)
export default class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create = async (request, response) => {
    try {
      // const product = await this.productService.create({ ...request.body, ...request.files });
      // return response.json(product);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  @Get()
  getAll = async (_, response) => {
    try {
      const product = await this.productService.getAll();

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  getOne = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const product = await this.productService.getOne(productId);

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  @Put(`/:${URL_PRODUCT_ID_PARAM}`)
  update = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const updatedProduct = await this.productService.update({ ...request.body, id: productId });

      return response.json(updatedProduct);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };

  @Delete(`/:${URL_PRODUCT_ID_PARAM}`)
  delete = async (request, response) => {
    try {
      const productId = request.params[URL_PRODUCT_ID_PARAM];
      const product = await this.productService.delete(productId);

      return response.json(product);
    } catch (error) {
      error instanceof mongoose.Error && response.status(500).json(error.message);
    }
  };
}
