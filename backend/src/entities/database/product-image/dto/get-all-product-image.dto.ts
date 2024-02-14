import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { ProductImage } from "../product-image.entity";

export default class GetAllProductImageDto extends IntersectionType(
  BaseGetAllDto,
  PickType(ProductImage, ["productId"]),
) {}
