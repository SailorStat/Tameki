import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { BlockedStateCreateDto } from "@utility/blocked-state/dto/create-blocked-state.dto";

import { Review } from "../review.entity";

export default class ReviewCreateDto extends IntersectionType(
  PickType(Review, ["text", "rating"]),
  BlockedStateCreateDto,
) {
  @ApiProperty({
    description: "Изображения к отзыву",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];
}
