import { UncorrectAuthorization } from "src/exceptions/uncorrect-authorization.exception";

export default function assertUserValidate(passwordValid: boolean): asserts passwordValid is true {
  if (!passwordValid) {
    throw new UncorrectAuthorization();
  }
}
