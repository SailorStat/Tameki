import { IntersectionType } from "@nestjs/swagger";
import { BlockedStateGetAllDto } from "@utility/blocked-state/dto/get-all-blocked-state.dto";

import ProductGetDto from "./get-review.dto";

export default class ProductGetAllDto extends IntersectionType(BlockedStateGetAllDto, ProductGetDto) {}
