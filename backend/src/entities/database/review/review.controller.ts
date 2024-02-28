import { AddUserId, RequestWithUserId } from "@guards/jwt-auth.guard";
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
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlockedStateBlockDto } from "@utility/blocked-state/dto/block-blocked-state.dto";
import { SoftDeleteDeleteDto } from "@utility/soft-delete/dto/delete-soft-delete.dto";

import { ReviewCreateDto } from "./dto/create-review.dto";
import ReviewGetAllDto from "./dto/get-all-reviews.dto";
import ReviewGetByParamsDto from "./dto/get-by-params-review.dto";
import ReviewGetDto from "./dto/get-review.dto";
import { REVIEW_BASE_URL, URL_REVIEW_ID_PARAM } from "./review.constants";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";

@ApiTags("Отзывы")
@Controller(REVIEW_BASE_URL)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiOperation({ description: "Получить список всех отзывов", summary: "Получить все отзывы" })
  @ApiResponse({ description: "Успешный поиск отзывов", status: HttpStatus.OK, type: [Review] })
  @Get()
  async getAll(@Query() getAllReviewsDto: ReviewGetAllDto) {
    const reviews = await this.reviewService.getAll(getAllReviewsDto);

    return reviews;
  }

  @ApiOperation({ description: "Создать отзыв", summary: "Создать отзыв" })
  @ApiResponse({ description: "Успешное создание отзыва", status: HttpStatus.CREATED, type: Review })
  @UseInterceptors(FilesInterceptor("images"))
  @AddUserId()
  @Post()
  async create(@Body() createDto: ReviewCreateDto, @UploadedFiles() images = [], @Req() { userId }: RequestWithUserId) {
    const review = await this.reviewService.create({ ...createDto, images, userId });

    return review;
  }

  @ApiOperation({ description: "Получить отзыв", summary: "Получить отзыв" })
  @ApiResponse({ description: "Успешный поиск отзывов", status: HttpStatus.OK, type: Review })
  @Get("/review")
  async getByParams(@Query() getReviewDto: ReviewGetByParamsDto) {
    const review = await this.reviewService.getByParams(getReviewDto);

    return review;
  }

  @ApiOperation({ description: "Получить отзыв", summary: "Получить отзыв" })
  @ApiResponse({ description: "Успешный поиск отзывов", status: HttpStatus.OK, type: Review })
  @Get(`/:${URL_REVIEW_ID_PARAM}`)
  async getById(@Param(URL_REVIEW_ID_PARAM) reviewId: number, @Query() getReviewDto: ReviewGetDto) {
    const review = await this.reviewService.getById(reviewId, getReviewDto);

    return review;
  }

  @ApiOperation({ description: "Удалить отзыв", summary: "Удалить отзыв" })
  @ApiResponse({ description: "Успешное удаление отзыва", status: HttpStatus.OK })
  @Delete(`/:${URL_REVIEW_ID_PARAM}`)
  async delete(@Param(URL_REVIEW_ID_PARAM) reviewId: number, @Body() deleteReviewDto: SoftDeleteDeleteDto) {
    const review = await this.reviewService.delete(reviewId, deleteReviewDto);

    return review;
  }

  @ApiOperation({ description: "Скрыть отзыв", summary: "Скрыть отзыв" })
  @ApiResponse({ description: "Успешное скрытие отзыва", status: HttpStatus.OK })
  @Patch(`/:${URL_REVIEW_ID_PARAM}/block`)
  async block(@Param(URL_REVIEW_ID_PARAM) reviewId: number, @Body() blockedStateHideDto: BlockedStateBlockDto) {
    const review = await this.reviewService.block(reviewId, blockedStateHideDto);

    return review;
  }

  @ApiOperation({ description: "Показать отзыв после блокировки", summary: "Показать отзыв" })
  @ApiResponse({ description: "Успешная разблокировка отзыва", status: HttpStatus.OK })
  @Patch(`/:${URL_REVIEW_ID_PARAM}/unblock`)
  async unblock(@Param(URL_REVIEW_ID_PARAM) reviewId: number) {
    const review = await this.reviewService.unblock(reviewId);

    return review;
  }
}
