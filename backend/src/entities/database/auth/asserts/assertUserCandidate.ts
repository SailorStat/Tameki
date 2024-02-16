import { HttpException, HttpStatus } from "@nestjs/common";

class UserCandidate {}

export default function assertUserCandidate(user: UserCandidate | undefined): asserts user is undefined {
  if (user) {
    throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST);
  }
}
