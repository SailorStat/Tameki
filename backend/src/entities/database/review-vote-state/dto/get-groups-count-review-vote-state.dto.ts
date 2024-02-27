import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseGetDto } from "@utility/base/dto/get-base.dto";

import { ReviewVoteState } from "../review-vote-state.entity";

export default class ReviewVoteGetGroupCountDto extends IntersectionType(
  BaseGetDto,
  PickType(ReviewVoteState, ["reviewId"]),
) {}
