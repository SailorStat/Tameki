import { IntersectionType } from "@nestjs/swagger";
import { SoftDeleteGetAllDto } from "@utility/soft-delete/dto/get-all-soft-delete.dto";

import ProductGetDto from "./get-product..dto";

export default class ProductGetAllDto extends IntersectionType(SoftDeleteGetAllDto, ProductGetDto) {}
