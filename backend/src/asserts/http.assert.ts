import { HttpException, HttpStatus } from "@nestjs/common";

export function assertFoundEntity(entity: any): asserts entity {
  if (!entity) {
    throw new HttpException("Сущность не найдена", HttpStatus.BAD_REQUEST);
  }
}
