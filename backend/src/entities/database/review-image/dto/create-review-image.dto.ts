import { IntersectionType, PickType } from "@nestjs/swagger";
import { CreateImageDto } from "@utility/image/dto/create-image.dto";

import { ReviewImage } from "../review-image.entity";

export class CreateReviewImageDto extends IntersectionType(CreateImageDto, PickType(ReviewImage, ["reviewId"])) {}
