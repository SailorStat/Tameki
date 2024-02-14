import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { SoftDeleteGetDto } from "./get-soft-delete.dto";

export class SoftDeleteGetAllDto extends IntersectionType(BaseGetAllDto, SoftDeleteGetDto) {}
