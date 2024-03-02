import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { ReviewImage } from "../review-image.entity";

export class GetAllReviewImageDto extends IntersectionType(
  BaseGetAllDto,
  PartialType(PickType(ReviewImage, ["reviewId"])),
) {}
