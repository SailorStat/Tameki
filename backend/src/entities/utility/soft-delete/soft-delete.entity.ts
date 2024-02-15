import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
export class SoftDeleteEntity extends BaseEntity {
  @ApiProperty({ description: "Причина удаления", example: "Продавец Tameki больше не собирается его производить" })
  @Column({ nullable: true, select: false, type: "varchar" })
  deletionReason?: string;
}
