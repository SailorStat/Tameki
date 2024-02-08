import { PartialType, PickType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import ProductDto from "./product.dto";

export default class UpdateProductDto extends PartialType(
  PickType(ProductDto, [
    "article",
    "description",
    "estimation",
    "favorites",
    "hidingReason",
    "images",
    "inStock",
    "labels",
    "price",
    "soldTimes",
    "title",
  ]),
) {
  @IsOptional()
  article?: ProductDto["article"];

  @IsOptional()
  description?: ProductDto["description"];

  @IsOptional()
  estimation?: ProductDto["estimation"];

  @IsOptional()
  favorites?: ProductDto["favorites"];

  @IsOptional()
  hidingReason?: ProductDto["hidingReason"];

  @IsOptional()
  images?: ProductDto["images"];

  @IsOptional()
  inStock?: ProductDto["inStock"];

  @IsOptional()
  labels?: ProductDto["labels"];

  @IsOptional()
  price?: ProductDto["price"];

  @IsOptional()
  soldTimes?: ProductDto["soldTimes"];

  @IsOptional()
  title?: ProductDto["title"];
}
