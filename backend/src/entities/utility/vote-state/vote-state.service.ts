import { Injectable } from "@nestjs/common";
import { BaseService } from "@utility/base/base.service";
import { Repository } from "typeorm";

import { VoteStateVoteDto } from "./dto/vote-vote-state.dto";
import { VoteState } from "./vote-state.entity";

@Injectable()
export class VoteStateService<VoteEntity extends VoteState> extends BaseService<VoteEntity> {
  readonly entityName: string = "vote";

  constructor(protected readonly repository: Repository<VoteEntity>) {
    super(repository);
  }

  declare vote: (voteDto: VoteStateVoteDto) => Promise<VoteEntity>;
}
