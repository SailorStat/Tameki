import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { ProductImage } from "../product-image.entity";

export class GetAllProductImageDto extends IntersectionType(
  BaseGetAllDto,
  PartialType(PickType(ProductImage, ["productId"])),
) {}
