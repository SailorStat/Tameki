import { Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";

import { PRODUCT_BASE_URL, URL_PRODUCT_ID_PARAM } from "./constants";
import ProductService from "./product.service";

@Controller(PRODUCT_BASE_URL)
export default class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(req: any, res: any) {
    try {
      const product = this.productService.create();

      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  @Get()
  async getAll(req: any, res: any) {
    try {
      const product = await this.productService.getAll();

      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  async getOne(@Param(URL_PRODUCT_ID_PARAM) productId: string, @Response() res: any): Promise<any> {
    try {
      const product = await this.productService.getOne(productId);

      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  @Put(`/:${URL_PRODUCT_ID_PARAM}`)
  async update(req: any, res: any) {
    try {
      const productId = req.params[URL_PRODUCT_ID_PARAM];
      const updatedProduct = await this.productService.update();

      return res.json(updatedProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  @Delete(`/:${URL_PRODUCT_ID_PARAM}`)
  async delete(req: any, res: any) {
    try {
      const productId = req.params[URL_PRODUCT_ID_PARAM];
      const product = await this.productService.delete(productId);

      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
