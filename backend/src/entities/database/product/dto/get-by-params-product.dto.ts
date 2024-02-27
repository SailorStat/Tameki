import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

import { Product } from "../product.entity";
import ProductGetDto from "./get-product.dto";

export default class ProductGetByParamsDto extends PartialType(
  IntersectionType(ProductGetDto, OmitType(Product, ["images"])),
) {}
