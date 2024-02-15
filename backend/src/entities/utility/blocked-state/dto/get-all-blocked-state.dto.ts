import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { BlockedStateGetDto } from "./get-blocked-state.dto";

export class BlockedStateGetAllDto extends IntersectionType(BaseGetAllDto, BlockedStateGetDto) {}
