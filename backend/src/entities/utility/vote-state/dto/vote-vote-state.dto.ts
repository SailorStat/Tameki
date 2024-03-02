import { PickType } from "@nestjs/swagger";

import { VoteState } from "../vote-state.entity";

export class VoteStateVoteDto extends PickType(VoteState, ["vote"]) {
  userId: number;
}
