import { IntersectionType, PickType } from "@nestjs/swagger";

import { Auth } from "../auth.entity";
import { AuthSessionDto } from "./session-auth.dto";

export class AuthValidateSessionDto extends IntersectionType(AuthSessionDto, PickType(Auth, ["accessToken"])) {}
