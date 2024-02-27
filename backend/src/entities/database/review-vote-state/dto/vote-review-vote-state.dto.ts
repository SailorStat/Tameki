import { IntersectionType, PickType } from "@nestjs/swagger";
import VoteStateVoteDto from "@utility/vote-state/dto/vote-vote-state.dto";

import { ReviewVoteState } from "../review-vote-state.entity";

export default class ReviewVoteStateVoteDto extends IntersectionType(
  VoteStateVoteDto,
  PickType(ReviewVoteState, ["reviewId"]),
) {
  accessToken: string;
}
