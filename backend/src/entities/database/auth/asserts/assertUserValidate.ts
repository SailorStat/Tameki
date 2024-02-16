import { UnauthorizedException } from "@nestjs/common";

export default function assertUserValidate(passwordValid: boolean): asserts passwordValid is true {
  if (!passwordValid) {
    throw new UnauthorizedException({ message: "Email или пароль введены неверно" });
  }
}
