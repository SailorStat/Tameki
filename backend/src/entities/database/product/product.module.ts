import { AuthModule } from "@database/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductImageModule } from "../product-image/product-image.module";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product]), ProductImageModule, AuthModule],
  providers: [ProductService],
})
export class ProductModule {}
