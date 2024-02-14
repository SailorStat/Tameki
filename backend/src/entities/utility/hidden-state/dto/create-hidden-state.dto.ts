import { PickType } from "@nestjs/swagger";

import { HiddenStateEntity } from "../hidden-state.entity";

export class HiddenStateCreateDto extends PickType(HiddenStateEntity, ["hiddenReason"]) {}
