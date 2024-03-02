import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VoteStateService } from "@utility/vote-state/vote-state.service";
import { Repository } from "typeorm";

import { ReviewVoteGetGroupCountDto as ReviewVoteGetGroupsCountDto } from "./dto/get-groups-count-review-vote-state.dto";
import { ReviewVoteStateVoteServiceParams } from "./dto/vote-review-vote-state.dto";
import { ReviewVoteGetGroupsCountResult } from "./get-groups-count-result-review-vote-state.types";
import { ReviewVoteState } from "./review-vote-state.entity";

@Injectable()
export class ReviewVoteStateService extends VoteStateService<ReviewVoteState> {
  readonly entityName: string = "review_vote_state";

  constructor(@InjectRepository(ReviewVoteState) protected readonly repository: Repository<ReviewVoteState>) {
    super(repository);
  }

  getGroupsCount = async ({ reviewId }: ReviewVoteGetGroupsCountDto): Promise<ReviewVoteGetGroupsCountResult> => {
    const result = await this.repository
      .createQueryBuilder(this.entityName)
      .select(`SUM(CASE WHEN ${this.entityName}.vote = :like THEN 1 ELSE 0 END)`, "likes")
      .addSelect(`SUM(CASE WHEN ${this.entityName}.vote = :dislike THEN 1 ELSE 0 END)`, "dislikes")
      .setParameter("like", true)
      .setParameter("dislike", false)
      .where(`${this.entityName}.reviewId = :reviewId`, { reviewId })
      .getRawOne();

    return { dislikes: +result.dislikes, likes: +result.likes };
  };

  vote = async ({ vote, reviewId, userId }: ReviewVoteStateVoteServiceParams) => {
    let reviewVote = await this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.reviewId = :reviewId`, { reviewId })
      .andWhere(`${this.entityName}.userId = :userId`, { userId })
      .getOne();

    reviewVote ??= this.repository.create({ reviewId, userId, vote });
    reviewVote.vote = vote;

    return this.repository.save(reviewVote);
  };
}
