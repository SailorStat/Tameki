import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import ProductController from "./product.controller";
import Product from "./product.model";
import ProductService from "./product.service";

@Module({
  controllers: [ProductController],
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductService],
})
export class ProductModule {}
