import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { SoftDeleteDeleteDto } from "../softDelete/dto/delete-soft-delete.dto";
import CreateImageDto from "./dto/create-image.dto";
import GetAllImagesDto from "./dto/get-all-images.dto";
import GetImageByParamsDto from "./dto/get-by-params-product..dto";
import GetImageDto from "./dto/get-image..dto";
import UpdateImageDto from "./dto/update-image.dto";
import { IMAGE_BASE_URL, URL_IMAGE_ID_PARAM } from "./image.constants";
import { Image } from "./image.entity";
import { ImageService } from "./image.service";

@ApiTags("Изображения")
@Controller(IMAGE_BASE_URL)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({
    description: "Извлекает все изображения, хранящиеся в базе данных.",
    summary: "Получить все данные изображений",
  })
  @ApiResponse({
    description: "Список всех изображений получен успешно",
    status: HttpStatus.OK,
    type: [Image],
  })
  @Get()
  async getAll(@Query() getAllImagesDto: GetAllImagesDto): Promise<Image[]> {
    const images = await this.imageService.getAll(getAllImagesDto);

    return images;
  }

  @Get(`:${URL_IMAGE_ID_PARAM}`)
  @ApiOperation({
    description: "Извлекает изображение по его параметрам",
    summary: "Получить изображение по его параметрам",
  })
  @ApiResponse({ description: "Изображение найдено", status: HttpStatus.OK, type: Image })
  async getByParams(@Query() getImageDto: GetImageByParamsDto) {
    const image = await this.imageService.getByParams(getImageDto);

    return image;
  }

  @Get(`:${URL_IMAGE_ID_PARAM}`)
  @ApiOperation({
    description: "Извлекает изображение по его уникальному идентификатору.",
    summary: "Получить изображение по ID",
  })
  @ApiResponse({ description: "Изображение найдено", status: HttpStatus.OK, type: Image })
  async getById(@Param("imageId") imageId: string, @Query() getImageDto: GetImageDto): Promise<Image> {
    const image = await this.imageService.getById(imageId, getImageDto);

    return image;
  }

  @Post()
  @ApiOperation({ description: "Создает новое изображение в базе данных.", summary: "Создать новое изображение" })
  @ApiResponse({ description: "Изображение успешно создано", status: HttpStatus.CREATED, type: Image })
  async create(@Body() image: CreateImageDto): Promise<Image> {
    const createdImage = await this.imageService.create(image);

    return createdImage;
  }

  @ApiOperation({
    description: "Обновляет существующее изображение по его уникальному идентификатору.",
    summary: "Обновить изображение",
  })
  @ApiResponse({ description: "Изображение успешно обновлено", status: HttpStatus.OK, type: Image })
  @Put(`:${URL_IMAGE_ID_PARAM}`)
  async update(@Param("imageId") imageId: string, @Body() image: UpdateImageDto): Promise<Image> {
    const updatedImage = await this.imageService.update(imageId, image);

    return updatedImage;
  }

  @ApiOperation({
    description: "Удаляет изображение из базы данных по его уникальному идентификатору.",
    summary: "Удалить изображение",
  })
  @ApiResponse({ description: "Изображение успешно удалено", status: HttpStatus.NO_CONTENT })
  @Delete(`:${URL_IMAGE_ID_PARAM}`)
  async delete(@Param("imageId") imageId: string, @Body() deleteImageDto: SoftDeleteDeleteDto) {
    const deleteResult = await this.imageService.delete(imageId, deleteImageDto);

    return deleteResult;
  }
}
