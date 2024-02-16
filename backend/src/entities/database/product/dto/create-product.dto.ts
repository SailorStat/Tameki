import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { HiddenStateCreateDto } from "@utility/hidden-state/dto/create-hidden-state.dto";

import { Product } from "../product.entity";

export default class ProductCreateDto extends IntersectionType(
  PickType(Product, ["article", "description", "inStock", "labels", "price", "title", "hiddenReason"]),
  HiddenStateCreateDto,
) {
  @ApiProperty({
    description: "Изображения товара",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];
}
