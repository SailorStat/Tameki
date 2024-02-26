import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReviewImageModule } from "../review-image/review-image.module";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";

@Module({
  controllers: [ReviewController],
  imports: [TypeOrmModule.forFeature([Review]), ReviewImageModule],
  providers: [ReviewService],
})
export class ReviewModule {}
