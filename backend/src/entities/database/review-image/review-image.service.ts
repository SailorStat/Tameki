import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveFileReturnType } from "@utility/file/file.types";
import { ImageService } from "@utility/image/image.service";
import { Repository } from "typeorm";

import GetAllReviewImageDto from "./dto/get-all-review-image.dto";
import UpdateReviewImageDto from "./dto/update-review-image.dto";
import { ReviewImage } from "./review-image.entity";

@Injectable()
export class ReviewImageService extends ImageService {
  readonly entityName: string = "review_image";

  FileBuilder = ReviewImage;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @InjectRepository(ReviewImage) protected readonly repository: Repository<ReviewImage>,
  ) {
    super(configService, repository);
  }

  protected declare createEntity: (file: Express.Multer.File) => ReviewImage;

  save = async (file: Express.Multer.File, reviewId: number): SaveFileReturnType<ReviewImage> => {
    const uploadsPath = this.configService.get("UPLOADS_PATH");
    const fileEntity = this.createEntity(file);
    const filePath = `${uploadsPath}/${fileEntity.url}`;

    fileEntity.reviewId = reviewId;

    try {
      await this.writeWithRetry(filePath, file);
    } catch (error) {
      return { errorMessage: error.message };
    }

    return this.repository.save(fileEntity);
  };

  declare getAll: (getAllReviewImageDto: GetAllReviewImageDto) => Promise<ReviewImage[]>;

  declare getById: (reviewImageId: number) => Promise<ReviewImage>;

  declare update: (reviewImageId: number, updateImageDto: UpdateReviewImageDto) => Promise<ReviewImage>;
}
