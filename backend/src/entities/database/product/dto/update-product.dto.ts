import { PartialType, PickType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { Product } from "../product.entity";

export default class ProductUpdateDto extends PartialType(
  PickType(Product, [
    "article",
    "description",
    "estimation",
    "favorites",
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
