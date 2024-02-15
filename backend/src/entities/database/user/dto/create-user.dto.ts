import { IsArray, IsEnum } from "@constraints";
import { RoleNames } from "@database/role/role.constants";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { TransformJSON } from "@transform";

import { User } from "../user.entity";

export class UserCreateDto extends PickType(User, ["about", "email", "firstname", "lastname", "nickname", "password"]) {
  @ApiProperty({
    description: "Изображения товара",
    items: { format: "binary", type: "string" },
    required: false,
    type: "array",
  })
  images: Express.Multer.File[];

  @ApiProperty({
    description: "Роли пользователя",
    enum: RoleNames,
    example: [RoleNames.Admin, RoleNames.Buyer],
    isArray: true,
    type: [RoleNames],
  })
  @IsArray()
  @IsEnum(RoleNames, { each: true })
  @TransformJSON()
  roleNames: RoleNames[];
}
