import { HttpException, HttpStatus } from "@nestjs/common";

import { HiddenStateEntity } from "../hidden-state.entity";

class HiddenStateHiddenEntity extends HiddenStateEntity {
  hiddenAt: Date;

  hiddenReason: string;
}

export default function assertDeletedEntity(entity: HiddenStateEntity): asserts entity is HiddenStateHiddenEntity {
  if (!entity.hiddenAt || !entity.hiddenReason) {
    throw new HttpException("Запись не была скрыта", HttpStatus.BAD_REQUEST);
  }
}
