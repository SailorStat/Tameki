import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import GetAllProductImageDto from "./dto/get-all-product-image.dto";
import UpdateProductImageDto from "./dto/update-product-image.dto";
import { PRODUCT_IMAGE_BASE_URL, URL_PRODUCT_IMAGE_ID_PARAM } from "./product-image.constants";
import { ProductImage } from "./product-image.entity";
import { ProductImageService } from "./product-image.service";

@ApiTags("Изображения товаров")
@Controller(PRODUCT_IMAGE_BASE_URL)
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @ApiOperation({
    description: "Получить список всех доступных изображений товаров",
    summary: "Получить все изображения товаров",
  })
  @ApiResponse({ description: "Успешный поиск изображений товаров", status: HttpStatus.OK, type: [ProductImage] })
  @Get()
  async getAll(@Query() getAllProductImageDto: GetAllProductImageDto) {
    const productImages = await this.productImageService.getAll(getAllProductImageDto);

    return productImages;
  }

  @ApiOperation({ description: "Получить изображение товара по ID", summary: "Получить изображение товара" })
  @ApiResponse({ description: "Успешный поиск изображения товара", status: HttpStatus.OK, type: ProductImage })
  @Get(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async getById(@Param(URL_PRODUCT_IMAGE_ID_PARAM) productImageId: number) {
    const productImage = await this.productImageService.getById(productImageId);

    return productImage;
  }

  @ApiOperation({ description: "Редактировать изображение товара", summary: "Редактировать изображение товара" })
  @ApiResponse({ description: "Успешное редактирование изображения товара", status: HttpStatus.OK, type: ProductImage })
  @Patch(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async update(
    @Param(URL_PRODUCT_IMAGE_ID_PARAM) productImageId: number,
    @Body() updateProductDto: UpdateProductImageDto,
  ) {
    const updatedProductImage = await this.productImageService.update(productImageId, updateProductDto);

    return updatedProductImage;
  }

  @ApiOperation({ description: "Удалить изображение товара", summary: "Удалить изображение товара" })
  @ApiResponse({ description: "Успешное удаление изображения товара", status: HttpStatus.OK })
  @Delete(`/:${URL_PRODUCT_IMAGE_ID_PARAM}`)
  async delete(@Param(URL_PRODUCT_IMAGE_ID_PARAM) productImageId: number) {
    const productImage = await this.productImageService.delete(productImageId, {});

    return productImage;
  }
}
