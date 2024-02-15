import { PickType } from "@nestjs/swagger";

import { RoleCreateDto } from "./create-role.dto";

export class RoleUpdateDto extends PickType(RoleCreateDto, ["description"]) {}
