import { HttpException, HttpStatus } from "@nestjs/common";

import { HiddenStateEntity } from "../hidden-state.entity";

class HiddenStateHiddenEntity extends HiddenStateEntity {
  hiddenReason: string;
}

export default function assertHiddenEntity(entity: HiddenStateEntity): asserts entity is HiddenStateHiddenEntity {
  if (!entity.hiddenReason) {
    throw new HttpException("Запись не была скрыта", HttpStatus.BAD_REQUEST);
  }
}
