import { HttpException, HttpStatus } from "@nestjs/common";

import { SoftDeleteEntity } from "../soft-delete.entity";

class DeletedSoftDeleteEntity extends SoftDeleteEntity {
  deletionReason: string;
}

export default function assertDeletedEntity(entity: SoftDeleteEntity): asserts entity is DeletedSoftDeleteEntity {
  if (!entity.deletionReason) {
    throw new HttpException("Запись не была удалена", HttpStatus.BAD_REQUEST);
  }
}
