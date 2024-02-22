import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super("Нет доступа", HttpStatus.FORBIDDEN);
  }
}
