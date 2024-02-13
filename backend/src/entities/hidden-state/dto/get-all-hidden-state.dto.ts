import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "src/entities/base/dto/get-all-base.dto";

import { HiddenStateGetDto } from "./get-hidden-state.dto";

export class HiddenStateGetAllDto extends IntersectionType(BaseGetAllDto, HiddenStateGetDto) {}
