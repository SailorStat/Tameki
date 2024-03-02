import { IsEnum } from "@constraints";
import { RoleNames } from "@database/role/role.constants";
import { BaseGetDto } from "@utility/base/dto/get-base.dto";

export class PurchaseGetDto extends BaseGetDto {
  @IsEnum(RoleNames)
  roleNames: RoleNames[];
}

export class PurchaseServiceGetDto extends PurchaseGetDto {}
