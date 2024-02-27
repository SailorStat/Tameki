import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";

import { Review } from "../review.entity";

export default class ReviewCreateDto extends IntersectionType(PickType(Review, ["text", "rating", "productId"])) {
  @ApiProperty({
    description: "Изображения к отзыву",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];

  userId: number;
}

export class ReviewServiceCreateDto extends ReviewCreateDto {}
