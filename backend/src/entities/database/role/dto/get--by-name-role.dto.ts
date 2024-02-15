import { PickType } from "@nestjs/swagger";

import { Role } from "../role.entity";

export class RoleGetByNameDto extends PickType(Role, ["name"]) {}
