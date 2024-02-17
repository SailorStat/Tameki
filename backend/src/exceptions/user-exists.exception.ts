import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExists extends HttpException {
  constructor() {
    super("Пользователь уже зарегистрирован", HttpStatus.BAD_REQUEST);
  }
}
