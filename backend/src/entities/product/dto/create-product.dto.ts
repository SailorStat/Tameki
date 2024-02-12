import { ApiProperty, PickType } from "@nestjs/swagger";

import { Product } from "../product.entity";

export default class CreateProductDto extends PickType(Product, [
  "article",
  "description",
  "hidingReason",
  "inStock",
  "labels",
  "price",
  "title",
]) {
  @ApiProperty({
    description: "Изображения товара",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];
}
