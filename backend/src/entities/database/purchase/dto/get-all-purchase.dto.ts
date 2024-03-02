import { RoleNames } from "@database/role/role.constants";
import { IntersectionType } from "@nestjs/swagger";

import { PurchaseGetDto } from "./get-purchase.dto";

export class PurchaseGetAllDto extends IntersectionType(SoftDeleteGetAllDto, PurchaseGetDto) {
  roleName: RoleNames;
}
