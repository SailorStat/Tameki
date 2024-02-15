import { PickType } from "@nestjs/swagger";

import { BlockedStateEntity } from "../blocked-state.entity";

export class BlockedStateCreateDto extends PickType(BlockedStateEntity, ["blockedReason"]) {}
