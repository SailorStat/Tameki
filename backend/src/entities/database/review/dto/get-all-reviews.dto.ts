import { IntersectionType } from "@nestjs/swagger";
import { BlockedStateGetAllDto } from "@utility/blocked-state/dto/get-all-blocked-state.dto";

import { ReviewGetDto as ProductGetDto } from "./get-review.dto";

export class ReviewGetAllDto extends IntersectionType(BlockedStateGetAllDto, ProductGetDto) {}
