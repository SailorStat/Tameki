import { HttpException, HttpStatus } from "@nestjs/common";

import { HiddenStateEntity } from "../hidden-state.entity";

class HiddenStateShowedEntity extends HiddenStateEntity {
  hiddenReason: null;
}

export default function assertShowedEntity(entity: HiddenStateEntity): asserts entity is HiddenStateShowedEntity {
  if (entity.hiddenReason) {
    throw new HttpException("Запись уже была заблокирована", HttpStatus.BAD_REQUEST);
  }
}
