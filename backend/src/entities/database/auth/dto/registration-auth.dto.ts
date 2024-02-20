import { UserCreateDto } from "@database/user/dto/create-user.dto";
import { IntersectionType } from "@nestjs/swagger";

import { AuthSessionDto } from "./session-auth.dto";

export class AuthRegistrationDto extends IntersectionType(UserCreateDto, AuthSessionDto) {}
