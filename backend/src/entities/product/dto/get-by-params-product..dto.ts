import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

import { Product } from "../product.entity";
import GetProductDto from "./get-product..dto";

export default class GetProductByParamsDto extends PartialType(
  IntersectionType(GetProductDto, OmitType(Product, ["images"])),
) {}