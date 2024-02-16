import { HttpException, HttpStatus } from "@nestjs/common";

import { BlockedStateEntity } from "../blocked-state.entity";

class BlockedStateBlockedEntity extends BlockedStateEntity {
  blockedReason: string;
}

export default function assertBlockedEntity(entity: BlockedStateEntity): asserts entity is BlockedStateBlockedEntity {
  if (!entity.blockedReason) {
    throw new HttpException("Запись не была заблокирована", HttpStatus.BAD_REQUEST);
  }
}
