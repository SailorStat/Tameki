import { IsNumber } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { Image } from "@utility/image/image.entity";
import { Column, Entity, ManyToOne } from "typeorm";

import { Review } from "../review/review.entity";

@Entity()
export class ReviewImage extends Image {
  @ApiProperty({ description: "ID отзыва", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column()
  reviewId: number;

  @ApiProperty({ description: "Отзыв, которому принадлежит изображение", type: () => Review })
  @ManyToOne(() => Review, (review) => review.images)
  review: Review;
}
