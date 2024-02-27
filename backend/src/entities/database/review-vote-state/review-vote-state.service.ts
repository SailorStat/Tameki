import { AuthService } from "@database/auth/auth.service";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VoteStateService } from "@utility/vote-state/vote-state.service";
import { Repository } from "typeorm";

import ReviewVoteGetGroupsCountDto from "./dto/get-groups-count-review-vote-state.dto";
import ReviewVoteStateVoteDto from "./dto/vote-review-vote-state.dto";
import { ReviewVoteGetGroupsCountResult } from "./get-groups-count-result-review-vote-state.types";
import { ReviewVoteState } from "./review-vote-state.entity";

@Injectable()
export class ReviewVoteStateService extends VoteStateService<ReviewVoteState> {
  readonly entityName: string = "review_vote";

  constructor(
    @InjectRepository(ReviewVoteState) protected readonly repository: Repository<ReviewVoteState>,
    @Inject(AuthService) protected readonly authService: AuthService,
  ) {
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

    return { dislikes: parseInt(result.dislikes) ?? 0, likes: parseInt(result.likes) ?? 0 };
  };

  vote = async ({ vote, accessToken, reviewId }: ReviewVoteStateVoteDto) => {
    const { user } = await this.authService.getUserSessionByAccessToken(accessToken);

    let reviewVote = await this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.reviewId = :reviewId`, { reviewId })
      .andWhere(`${this.entityName}.userId = :userId`, { userId: user.id })
      .getOne();

    reviewVote ??= this.repository.create({ reviewId, userId: user.id, vote });

    reviewVote.vote = vote;

    return this.repository.save(reviewVote);
  };
}
