import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

import { User } from "../user.entity";
import { UserGetDto } from "./get-user.dto";

export class UserGetByParamsDto extends PartialType(IntersectionType(UserGetDto, OmitType(User, ["images"]))) {}
