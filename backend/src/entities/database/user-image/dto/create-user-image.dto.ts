import { IntersectionType, PickType } from "@nestjs/swagger";
import { CreateImageDto } from "@utility/image/dto/create-image.dto";

import { UserImage } from "../user-image.entity";

export class CreateUserImageDto extends IntersectionType(CreateImageDto, PickType(UserImage, ["userId"])) {}
