import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { HiddenStateGetDto } from "./get-hidden-state.dto";

export class HiddenStateGetAllDto extends IntersectionType(BaseGetAllDto, HiddenStateGetDto) {}
