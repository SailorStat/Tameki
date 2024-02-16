import { HttpException, HttpStatus } from "@nestjs/common";

import { BlockedStateEntity } from "../blocked-state.entity";

class BlockedStateBlockedEntity extends BlockedStateEntity {
  blockedReason: null;
}

export default function assertUnblockedEntity(entity: BlockedStateEntity): asserts entity is BlockedStateBlockedEntity {
  if (entity.blockedReason) {
    throw new HttpException("Запись уже была заблокирована", HttpStatus.BAD_REQUEST);
  }
}
