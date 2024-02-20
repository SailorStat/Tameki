import { IntersectionType, PickType } from "@nestjs/swagger";

import { Auth } from "../auth.entity";
import { AuthSessionDto } from "./session-auth.dto";

export class AuthGenerateTokenDto extends IntersectionType(
  AuthSessionDto,
  PickType(Auth, ["previousRefreshToken", "user"]),
) {}
