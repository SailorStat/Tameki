import { HttpException, HttpStatus } from "@nestjs/common";

import { SoftDeleteEntity } from "../softDelete.entity";

class DeletedSoftDeleteEntity extends SoftDeleteEntity {
  deletedAt: Date;

  deletionReason: string;
}

export default function assertDeletedEntity(entity: SoftDeleteEntity): asserts entity is DeletedSoftDeleteEntity {
  if (!entity.deletedAt || !entity.deletionReason) {
    throw new HttpException("Запись не была удалена", HttpStatus.BAD_REQUEST);
  }
}
