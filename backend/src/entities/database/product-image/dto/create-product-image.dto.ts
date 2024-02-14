import { IntersectionType, PickType } from "@nestjs/swagger";
import CreateImageDto from "@utility/image/dto/create-image.dto";

import { ProductImage } from "../product-image.entity";

export default class CreateProductImageDto extends IntersectionType(
  CreateImageDto,
  PickType(ProductImage, ["productId"]),
) {}
