import { User } from "@database/user/user.entity";
import { PickType } from "@nestjs/swagger";

export class AuthLoginDto extends PickType(User, ["email", "password"]) {}
