import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserImageController } from "./user-image.controller";
import { UserImage } from "./user-image.entity";
import { UserImageService } from "./user-image.service";

@Module({
  controllers: [UserImageController],
  exports: [UserImageService],
  imports: [ConfigModule, TypeOrmModule.forFeature([UserImage])],
  providers: [UserImageService],
})
export class UserImageModule {}
