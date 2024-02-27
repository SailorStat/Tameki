import { IsNumber } from "@constraints";
import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { VoteState } from "@utility/vote-state/vote-state.entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";

import { Review } from "../review/review.entity";

@Entity()
@Index(["userId", "reviewId"], { unique: true })
export class ReviewVoteState extends VoteState {
  @ApiProperty({ description: "Пользователь, который оставил оценку", type: () => User })
  @ManyToOne(() => User, (user) => user.reviewVotes)
  user: User;

  @ApiProperty({ description: "ID отзыва", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column()
  reviewId: number;

  @ApiProperty({ description: "Отзыв, которому принадлежит оценка", type: () => Review })
  @ManyToOne(() => Review, (review) => review.votes)
  review: Review;
}
