import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SoftDeleteDeleteDto } from "src/entities/softDelete/dto/softDelete.delete.dto";

import CreateProductDto from "./dto/create-product.dto";
import GetAllProductsDto from "./dto/get-all-products.dto";
import GetProductDto from "./dto/get-product..dto";
import UpdateProductDto from "./dto/update-product.dto";
import { PRODUCT_BASE_URL, URL_PRODUCT_ID_PARAM } from "./product.constants";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@ApiTags("Товары")
@Controller(PRODUCT_BASE_URL)
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ description: "Получить список всех доступных товаров", summary: "Получить все товары" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: [Product] })
  @Get()
  async getAll(@Query() getAllProductsDto: GetAllProductsDto) {
    const product = await this.productService.getAll(getAllProductsDto);

    return product;
  }

  @ApiOperation({ description: "Создать товар", summary: "Создать товар" })
  @ApiResponse({ description: "Успешное создание товара", status: HttpStatus.CREATED, type: Product })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: Product })
  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  async getOne(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Query() getProductDto: GetProductDto) {
    const product = await this.productService.getOne(productId, getProductDto);

    return product;
  }

  @ApiOperation({ description: "Редактировать товар", summary: "Редактировать товар" })
  @ApiResponse({ description: "Успешное редактирование товара", status: HttpStatus.OK, type: Product })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}`)
  async update(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productService.update(productId, updateProductDto);

    return updatedProduct;
  }

  @ApiOperation({ description: "Удалить товар", summary: "Удалить товар" })
  @ApiResponse({ description: "Успешное удаление товара", status: HttpStatus.OK })
  @Delete(`/:${URL_PRODUCT_ID_PARAM}`)
  async delete(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Body() deleteProductDto: SoftDeleteDeleteDto) {
    const product = await this.productService.delete(productId, deleteProductDto);

    return product;
  }

  @ApiOperation({ description: "Восстановить товар после удаления", summary: "Восстановить товар" })
  @ApiResponse({ description: "Успешное восстановление товара", status: HttpStatus.OK })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}/restore`)
  async restore(@Param(URL_PRODUCT_ID_PARAM) productId: number) {
    const product = await this.productService.restore(productId);

    return product;
  }
}
