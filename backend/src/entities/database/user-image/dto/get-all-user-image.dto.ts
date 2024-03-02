import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseGetAllDto } from "@utility/base/dto/get-all-base.dto";

import { UserImage } from "../user-image.entity";

export class GetAllUserImageDto extends IntersectionType(BaseGetAllDto, PickType(UserImage, ["userId"])) {}
