import { AuthModule } from "@database/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReviewVoteStateController } from "./review-vote-state.controller";
import { ReviewVoteState } from "./review-vote-state.entity";
import { ReviewVoteStateService } from "./review-vote-state.service";

@Module({
  controllers: [ReviewVoteStateController],
  exports: [ReviewVoteStateService],
  imports: [TypeOrmModule.forFeature([ReviewVoteState]), AuthModule],
  providers: [ReviewVoteStateService],
})
export class ReviewVoteStateModule {}
