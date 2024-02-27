import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HiddenStateHideDto } from "@utility/hidden-state/dto/hide-hidden-state.dto";
import { SoftDeleteDeleteDto } from "@utility/soft-delete/dto/delete-soft-delete.dto";

import ProductCreateDto from "./dto/create-product.dto";
import ProductGetAllDto from "./dto/get-all-products.dto";
import ProductGetByParamsDto from "./dto/get-by-params-product.dto";
import ProductGetDto from "./dto/get-product.dto";
import ProductUpdateDto from "./dto/update-product.dto";
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
  async getAll(@Query() getAllProductsDto: ProductGetAllDto) {
    const products = await this.productService.getAll(getAllProductsDto);

    return products;
  }

  @ApiOperation({ description: "Создать товар", summary: "Создать товар" })
  @ApiResponse({ description: "Успешное создание товара", status: HttpStatus.CREATED, type: Product })
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(@Body() createDto: ProductCreateDto, @UploadedFiles() images = []) {
    const product = await this.productService.create({ ...createDto, images });

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: Product })
  @Get("/product")
  async getByParams(@Query() getProductDto: ProductGetByParamsDto) {
    const product = await this.productService.getByParams(getProductDto);

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: Product })
  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  async getById(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Query() getProductDto: ProductGetDto) {
    const product = await this.productService.getById(productId, getProductDto);

    return product;
  }

  @ApiOperation({ description: "Редактировать товар", summary: "Редактировать товар" })
  @ApiResponse({ description: "Успешное редактирование товара", status: HttpStatus.OK, type: Product })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}`)
  async update(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Body() updateProductDto: ProductUpdateDto) {
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

  @ApiOperation({ description: "Скрыть товар", summary: "Скрыть товар" })
  @ApiResponse({ description: "Успешное скрытие товара", status: HttpStatus.OK })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}/hide`)
  async hide(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Body() hiddenStateHideDto: HiddenStateHideDto) {
    const product = await this.productService.hide(productId, hiddenStateHideDto);

    return product;
  }

  @ApiOperation({ description: "Показать товар после скрытия", summary: "Показать товар" })
  @ApiResponse({ description: "Успешный показ товара", status: HttpStatus.OK })
  @Patch(`/:${URL_PRODUCT_ID_PARAM}/show`)
  async show(@Param(URL_PRODUCT_ID_PARAM) productId: number) {
    const product = await this.productService.show(productId);

    return product;
  }
}
