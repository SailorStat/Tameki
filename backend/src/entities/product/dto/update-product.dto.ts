import { PartialType, PickType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { Product } from "../product.entity";

export default class UpdateProductDto extends PartialType(
  PickType(Product, [
    "article",
    "description",
    "estimation",
    "favorites",
    "images",
    "inStock",
    "labels",
    "price",
    "soldTimes",
    "title",
  ]),
) {
  @IsOptional()
  article?: Product["article"];

  @IsOptional()
  description?: Product["description"];

  @IsOptional()
  estimation?: Product["estimation"];

  @IsOptional()
  favorites?: Product["favorites"];

  @IsOptional()
  hidingReason?: Product["hidingReason"];

  @IsOptional()
  images?: Product["images"];

  @IsOptional()
  inStock?: Product["inStock"];

  @IsOptional()
  labels?: Product["labels"];

  @IsOptional()
  price?: Product["price"];

  @IsOptional()
  soldTimes?: Product["soldTimes"];

  @IsOptional()
  title?: Product["title"];
}
