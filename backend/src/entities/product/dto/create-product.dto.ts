import { PickType } from "@nestjs/swagger";

import { Product } from "../product.entity";

export default class CreateProductDto extends PickType(Product, [
  "article",
  "description",
  "hidingReason",
  "images",
  "inStock",
  "labels",
  "price",
  "title",
]) {}
