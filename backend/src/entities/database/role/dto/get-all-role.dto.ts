import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { RoleGetDto } from "./get-role.dto";

export class RoleGetAllDto extends IntersectionType(BaseGetAllDto, RoleGetDto) {}
