import { UnauthorizedException } from "@exceptions/unauthorized.exception";

export default function assertSessionValidate(isSessionValid: boolean): asserts isSessionValid is true {
  if (!isSessionValid) {
    throw new UnauthorizedException();
  }
}
