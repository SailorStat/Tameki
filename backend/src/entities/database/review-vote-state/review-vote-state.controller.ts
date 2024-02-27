import { Body, Controller, Get, HttpStatus, Post, Query, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import ReviewVoteGetGroupCountDto from "./dto/get-groups-count-review-vote-state.dto";
import ReviewVoteStateVoteDto from "./dto/vote-review-vote-state.dto";
import { ReviewVoteGetGroupsCountResult } from "./get-groups-count-result-review-vote-state.types";
import { REVIEW_VOTE_BASE_URL } from "./review-vote-state.constants";
import { ReviewVoteStateService } from "./review-vote-state.service";

@ApiTags("Оценка к отзыву")
@Controller(REVIEW_VOTE_BASE_URL)
export class ReviewVoteStateController {
  constructor(private reviewVoteStateService: ReviewVoteStateService) {}

  @ApiOperation({
    description: "Получить состояние оценок к отзыву",
    summary: "Получить состояние оценок к отзыву",
  })
  @ApiResponse({
    description: "Успешный поиск оценок к отзыву",
    status: HttpStatus.OK,
    type: ReviewVoteGetGroupsCountResult,
  })
  @Get()
  async getAllGroupCount(@Query() getAllReviewVoteDto: ReviewVoteGetGroupCountDto) {
    const reviewVotes = await this.reviewVoteStateService.getGroupsCount(getAllReviewVoteDto);

    return reviewVotes;
  }

  @ApiOperation({ description: "Изменить оценку к отзыву", summary: "Изменить оценку к отзыву" })
  @ApiResponse({ description: "Успешное изменение оценки к отзыву", status: HttpStatus.OK })
  @Post()
  async vote(@Body() voteDto: Omit<ReviewVoteStateVoteDto, "accessToken">, @Req() request: Request) {
    const reviewVote = await this.reviewVoteStateService.vote({
      ...voteDto,
      accessToken: request.headers.authorization,
    });

    return reviewVote;
  }
}
