import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import CreateProductDto from "./dto/createProduct.dto";
import { PRODUCT_BASE_URL, URL_PRODUCT_ID_PARAM } from "./product.constants";
import { Product } from "./product.model";
import { ProductService } from "./product.service";

@ApiTags("Товары")
@Controller(PRODUCT_BASE_URL)
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ description: "Получить список всех доступных товаров", summary: "Получить все товары" })
  @ApiResponse({ description: "Успешный поиск товаров", status: 200, type: [Product] })
  @Get()
  async getAll() {
    const product = await this.productService.getAll();

    return product;
  }

  @ApiOperation({ description: "Создать товар", summary: "Создать товар" })
  @ApiResponse({ description: "Успешное создание товара", status: 201, type: Product })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: 200, type: Product })
  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  async getOne(@Param(URL_PRODUCT_ID_PARAM) productId: string) {
    const product = await this.productService.getOne(productId);

    return product;
  }

  @ApiOperation({ description: "Редактировать товар", summary: "Редактировать товар" })
  @ApiResponse({ description: "Успешное редактирование товара", status: 200, type: Product })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}`)
  async update(@Param(URL_PRODUCT_ID_PARAM) productId: string) {
    const updatedProduct = await this.productService.update();

    return updatedProduct;
  }

  @ApiOperation({ description: "Удалить товар", summary: "Удалить товар" })
  @ApiResponse({ description: "Успешное удаление товара", status: 200, type: () => ({ message: "OK" }) })
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
