import { ApiProperty, OmitType } from "@nestjs/swagger";

import { Review } from "./review.entity";

export class ReviewResult extends OmitType(Review, ["votes"]) {
  @ApiProperty({ description: "Количество лайков", example: 10 })
  likes: number;

  @ApiProperty({ description: "Количество дизлайков", example: 2 })
  dislikes: number;
}
