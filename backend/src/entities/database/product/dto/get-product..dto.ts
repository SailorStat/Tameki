import { IntersectionType } from "@nestjs/swagger";
import { HiddenStateGetDto } from "@utility/hidden-state/dto/get-hidden-state.dto";
import { SoftDeleteGetDto } from "@utility/soft-delete/dto/get-soft-delete.dto";

export default class ProductGetDto extends IntersectionType(SoftDeleteGetDto, HiddenStateGetDto) {}
