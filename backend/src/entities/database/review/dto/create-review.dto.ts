import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";

import { Review } from "../review.entity";

export class ReviewCreateDto extends IntersectionType(PickType(Review, ["text", "rating", "productId"])) {
  @ApiProperty({
    description: "Изображения к отзыву",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];
}

export interface ReviewCreateServiceParams extends ReviewCreateDto {
  userId: number;
}
