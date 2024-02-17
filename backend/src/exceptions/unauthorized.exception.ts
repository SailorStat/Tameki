import { UnauthorizedException as DefaultUnauthorizedException } from "@nestjs/common";

export class UnauthorizedException extends DefaultUnauthorizedException {
  constructor() {
    super("Пользователь не авторизован");
  }
}
