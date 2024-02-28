import { ReviewImageService } from "@database/review-image/review-image.service";
import { ReviewVoteStateService } from "@database/review-vote-state/review-vote-state.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@utility/base/base.service";
import { BlockedStateService } from "@utility/blocked-state/blocked-state.service";
import { BlockedStateBlockDto } from "@utility/blocked-state/dto/block-blocked-state.dto";
import { assertFoundEntity } from "src/asserts/http.assert";
import { Repository, SelectQueryBuilder } from "typeorm";

import { ReviewCreateServiceParams } from "./dto/create-review.dto";
import ReviewGetAllDto from "./dto/get-all-reviews.dto";
import ReviewGetDto from "./dto/get-review.dto";
import { Review } from "./review.entity";

@Injectable()
export class ReviewService extends BaseService<
  Review,
  ReviewGetDto,
  ReviewGetAllDto,
  ReviewCreateServiceParams,
  object
> {
  readonly entityName: string = "review";

  blockedStateService: BlockedStateService<Review>;

  constructor(
    @InjectRepository(Review) protected readonly repository: Repository<Review>,
    protected readonly reviewImageService: ReviewImageService,
    protected readonly reviewVoteStateService: ReviewVoteStateService,
  ) {
    super(repository);
    this.blockedStateService = new BlockedStateService(repository, this.entityName);
  }

  protected getReviewModify = (
    queryBuilder: SelectQueryBuilder<Review>,
    _?: ReviewGetDto,
  ): SelectQueryBuilder<Review> => {
    queryBuilder
      .loadRelationCountAndMap(
        `${this.entityName}.likes`,
        `${this.entityName}.votes`,
        this.reviewVoteStateService.entityName,
        (qb) => qb.andWhere(`${this.reviewVoteStateService.entityName}.vote = :vote`, { vote: true }),
      )
      .loadRelationCountAndMap(
        `${this.entityName}.dislikes`,
        `${this.entityName}.votes`,
        this.reviewVoteStateService.entityName,
        (qb) => qb.andWhere(`${this.reviewVoteStateService.entityName}.vote = :vote`, { vote: false }),
      );

    return queryBuilder.leftJoinAndSelect(`${this.entityName}.images`, this.reviewImageService.entityName);
  };

  protected getWhereParams = (params: object): Partial<Review> => {
    const reviewWhere = this.repository.create(params);

    delete reviewWhere.images;

    return reviewWhere;
  };

  getAll = async (getAllReviewsDto: ReviewGetAllDto): Promise<Review[]> => {
    const { limit = 20, page = 1 } = getAllReviewsDto;

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(this.getWhereParams(getAllReviewsDto));

    this.getBaseModify(queryBuilder, getAllReviewsDto);
    this.getReviewModify(queryBuilder, getAllReviewsDto);
    this.getBaseManyModify(queryBuilder, { ...getAllReviewsDto, limit, page });

    return this.blockedStateService.getBlockedStateModify(queryBuilder, getAllReviewsDto).getMany();
  };

  getByParams = async (getByParamsDto: Partial<Review & ReviewGetDto>): Promise<Review> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getByParamsDto));

    this.getReviewModify(queryBuilder);
    this.getBaseModify(queryBuilder, getByParamsDto);

    const review = await this.blockedStateService.getBlockedStateModify(queryBuilder, getByParamsDto).getOne();

    assertFoundEntity(review);

    return review;
  };

  getById = async (reviewId: number, getReviewDto: ReviewGetDto): Promise<Review> => {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :reviewId`, { reviewId });

    this.getReviewModify(queryBuilder);
    this.getBaseModify(queryBuilder, getReviewDto);

    const review = await this.blockedStateService.getBlockedStateModify(queryBuilder, getReviewDto).getOne();

    assertFoundEntity(review);

    return review;
  };

  create = async ({ images, ...createDto }: ReviewCreateServiceParams) => {
    const toCreateEntity = this.repository.create(createDto);
    const createdReview = await this.repository.save(toCreateEntity);

    await Promise.allSettled(
      images.map(async (image) => {
        await this.reviewImageService.save(image, createdReview.id);
      }),
    );

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :reviewId`, { reviewId: createdReview.id });

    return this.getReviewModify(queryBuilder).getOne();
  };

  block = async (reviewId: number, blockDto: BlockedStateBlockDto) => {
    return this.blockedStateService.block(reviewId, blockDto);
  };

  unblock = async (reviewId: number) => {
    return this.blockedStateService.unblock(reviewId);
  };
}
