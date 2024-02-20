import { PickType } from "@nestjs/swagger";

import { Auth } from "../auth.entity";

export class AuthSessionDto extends PickType(Auth, ["device"]) {}
