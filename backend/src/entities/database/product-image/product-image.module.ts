import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductImageController } from "./product-image.controller";
import { ProductImage } from "./product-image.entity";
import { ProductImageService } from "./product-image.service";

@Module({
  controllers: [ProductImageController],
  exports: [ProductImageService],
  imports: [ConfigModule, TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
})
export class ProductImageModule {}
