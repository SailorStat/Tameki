import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import GetAllProductImageDto from "./dto/get-all-product-image.dto";
import UpdateProductImageDto from "./dto/update-image.dto";
import { PRODUCT_IMAGE_BASE_URL, URL_PRODUCT_IMAGE_ID_PARAM } from "./product-image.constants";
import { ProductImage } from "./product-image.entity";
import { ProductImageService } from "./product-image.service";

@ApiTags("Изображения товаров")
@Controller(PRODUCT_IMAGE_BASE_URL)
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @ApiOperation({ description: "Получить список всех доступных товаров", summary: "Получить все товары" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: [ProductImage] })
  @Get()
  async getAll(@Query() getAllProductImageDto: GetAllProductImageDto) {
    const product = await this.productImageService.getAll(getAllProductImageDto);

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: ProductImage })
  @Get(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async getById(@Param(URL_PRODUCT_IMAGE_ID_PARAM) productImageId: number) {
    const product = await this.productImageService.getById(productImageId);

    return product;
  }

  @ApiOperation({ description: "Редактировать товар", summary: "Редактировать товар" })
  @ApiResponse({ description: "Успешное редактирование товара", status: HttpStatus.OK, type: ProductImage })
  @Patch(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async update(@Param(URL_PRODUCT_IMAGE_ID_PARAM) productId: number, @Body() updateProductDto: UpdateProductImageDto) {
    const updatedProduct = await this.productImageService.update(productId, updateProductDto);

    return updatedProduct;
  }

  @ApiOperation({ description: "Удалить товар", summary: "Удалить товар" })
  @ApiResponse({ description: "Успешное удаление товара", status: HttpStatus.OK })
  @Delete(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async delete(@Param(URL_PRODUCT_IMAGE_ID_PARAM) productId: number) {
    const product = await this.productImageService.delete(productId, {});

    return product;
  }
}
