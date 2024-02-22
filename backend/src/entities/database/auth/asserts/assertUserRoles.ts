import { ForbiddenException } from "@exceptions/forbidden.exception";

export default function assertUserRoles(rolesValid: boolean): asserts rolesValid is true {
  if (!rolesValid) {
    throw new ForbiddenException();
  }
}
