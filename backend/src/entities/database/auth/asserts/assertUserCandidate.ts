import { UserExists } from "@exceptions/user-exists.exception";

class UserCandidate {}

export default function assertUserCandidate(user: UserCandidate | undefined): asserts user is undefined {
  if (user) {
    throw new UserExists();
  }
}
