import { User } from "@database/user/user.entity";
import { IntersectionType, PickType } from "@nestjs/swagger";

import { AuthSessionDto } from "./session-auth.dto";

export class AuthLoginDto extends IntersectionType(PickType(User, ["email", "password"]), AuthSessionDto) {}
