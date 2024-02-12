import { SelectQueryBuilder } from "typeorm";

import { BaseEntity } from "../base.entity";

export class BaseGetDto {
  leftJoinAndSelect?: Parameters<SelectQueryBuilder<BaseEntity>["leftJoinAndSelect"]>;
}
