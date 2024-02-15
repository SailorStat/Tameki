import { IntersectionType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { UserGetDto } from "./get-user.dto";

export class UserGetAllDto extends IntersectionType(BaseGetAllDto, UserGetDto) {}
