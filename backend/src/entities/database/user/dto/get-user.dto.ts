import { IntersectionType } from "@nestjs/swagger";
import { BaseGetDto } from "@utility/base/dto/get-base.dto";
import { BlockedStateGetDto } from "@utility/blocked-state/dto/get-blocked-state.dto";
import { SoftDeleteGetDto } from "@utility/soft-delete/dto/get-soft-delete.dto";

export class UserGetDto extends IntersectionType(BaseGetDto, BlockedStateGetDto, SoftDeleteGetDto) {
  withNotFound?: boolean;

  selectPassword?: boolean;
}
