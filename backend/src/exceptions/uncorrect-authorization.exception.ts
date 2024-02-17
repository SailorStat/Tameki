import { UnauthorizedException as DefaultUnauthorizedException } from "@nestjs/common";

export class UncorrectAuthorization extends DefaultUnauthorizedException {
  constructor() {
    super("Email или пароль введены неверно");
  }
}
