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
import { SoftDeleteDeleteDto } from "src/entities/soft-delete/dto/delete-soft-delete.dto";

import { HiddenStateHideDto } from "../hidden-state/dto/hide-hidden-state.dto";
import CreateProductDto from "./dto/create-product.dto";
import GetAllProductsDto from "./dto/get-all-products.dto";
import GetProductByParamsDto from "./dto/get-by-params-product..dto";
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
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
    const product = await this.productService.create({ ...createProductDto, images });

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: Product })
  @Get("/product")
  async getByParams(@Query() getProductDto: GetProductByParamsDto) {
    const product = await this.productService.getByParams(getProductDto);

    return product;
  }

  @ApiOperation({ description: "Получить товар", summary: "Получить товар" })
  @ApiResponse({ description: "Успешный поиск товаров", status: HttpStatus.OK, type: Product })
  @Get(`/:${URL_PRODUCT_ID_PARAM}`)
  async getById(@Param(URL_PRODUCT_ID_PARAM) productId: number, @Query() getProductDto: GetProductDto) {
    const product = await this.productService.getById(productId, getProductDto);

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
