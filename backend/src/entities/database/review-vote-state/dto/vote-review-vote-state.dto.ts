import { PickType } from "@nestjs/swagger";
import VoteStateVoteDto from "@utility/vote-state/dto/vote-vote-state.dto";

import { ReviewVoteState } from "../review-vote-state.entity";

export class ReviewVoteStateVoteDto extends PickType(ReviewVoteState, ["reviewId", "vote"]) {}

export interface ReviewVoteStateVoteServiceParams extends ReviewVoteStateVoteDto, VoteStateVoteDto {}
