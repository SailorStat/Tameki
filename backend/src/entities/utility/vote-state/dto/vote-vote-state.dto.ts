import { PickType } from "@nestjs/swagger";

import { VoteState } from "../vote-state.entity";

export default class VoteStateVoteDto extends PickType(VoteState, ["vote"]) {
  accessToken: string;
}
