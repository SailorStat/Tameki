import { HttpException, HttpStatus } from "@nestjs/common";

import { BlockedStateEntity } from "../blocked-state.entity";

class BlockedStateBlockedEntity extends BlockedStateEntity {
  blockedAt: Date;

  blockedReason: string;
}

export default function assertDeletedEntity(entity: BlockedStateEntity): asserts entity is BlockedStateBlockedEntity {
  if (!entity.blockedAt || !entity.blockedReason) {
    throw new HttpException("Запись не была заблокирована", HttpStatus.BAD_REQUEST);
  }
}
