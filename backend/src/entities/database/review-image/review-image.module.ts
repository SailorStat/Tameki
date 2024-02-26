import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReviewImageController } from "./review-image.controller";
import { ReviewImage } from "./review-image.entity";
import { ReviewImageService } from "./review-image.service";

@Module({
  controllers: [ReviewImageController],
  exports: [ReviewImageService],
  imports: [ConfigModule, TypeOrmModule.forFeature([ReviewImage])],
  providers: [ReviewImageService],
})
export class ReviewImageModule {}
