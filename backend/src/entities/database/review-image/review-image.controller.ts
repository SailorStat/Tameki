import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetAllReviewImageDto } from "./dto/get-all-review-image.dto";
import { UpdateReviewImageDto } from "./dto/update-review-image.dto";
import { REVIEW_IMAGE_BASE_URL, URL_REVIEW_IMAGE_ID_PARAM } from "./review-image.constants";
import { ReviewImage } from "./review-image.entity";
import { ReviewImageService } from "./review-image.service";

@ApiTags("Изображения к отзывам")
@Controller(REVIEW_IMAGE_BASE_URL)
export class ReviewImageController {
  constructor(private reviewImageService: ReviewImageService) {}

  @ApiOperation({
    description: "Получить список всех доступных изображений к отзывам",
    summary: "Получить все изображения к отзывам",
  })
  @ApiResponse({ description: "Успешный поиск изображений к отзывам", status: HttpStatus.OK, type: [ReviewImage] })
  @Get()
  async getAll(@Query() getAllReviewImageDto: GetAllReviewImageDto) {
    const reviewImages = await this.reviewImageService.getAll(getAllReviewImageDto);

    return reviewImages;
  }

  @ApiOperation({ description: "Получить изображение к отзыву", summary: "Получить изображение к отзыву" })
  @ApiResponse({ description: "Успешный поиск изображения к отзыву", status: HttpStatus.OK, type: ReviewImage })
  @Get(`/:${URL_REVIEW_IMAGE_ID_PARAM}`)
  async getById(@Param(URL_REVIEW_IMAGE_ID_PARAM) reviewImageId: number) {
    const reviewImage = await this.reviewImageService.getById(reviewImageId);

    return reviewImage;
  }

  @ApiOperation({ description: "Редактировать изображение к отзыву", summary: "Редактировать изображение к отзыву" })
  @ApiResponse({
    description: "Успешное редактирование изображения к отзыву",
    status: HttpStatus.OK,
    type: ReviewImage,
  })
  @Patch(`/:${URL_REVIEW_IMAGE_ID_PARAM}`)
  async update(@Param(URL_REVIEW_IMAGE_ID_PARAM) reviewId: number, @Body() updateReviewDto: UpdateReviewImageDto) {
    const updatedReviewImage = await this.reviewImageService.update(reviewId, updateReviewDto);

    return updatedReviewImage;
  }

  @ApiOperation({ description: "Удалить изображение к отзыву", summary: "Удалить изображение к отзыву" })
  @ApiResponse({ description: "Успешное удаление изображения к отзыву", status: HttpStatus.OK })
  @Delete(`/:${URL_REVIEW_IMAGE_ID_PARAM}`)
  async delete(@Param(URL_REVIEW_IMAGE_ID_PARAM) reviewId: number) {
    const reviewImage = await this.reviewImageService.delete(reviewId, {});

    return reviewImage;
  }
}
