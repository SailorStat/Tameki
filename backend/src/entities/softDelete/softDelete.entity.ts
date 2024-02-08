import { ApiProperty } from "@nestjs/swagger";
import { Column, DeleteDateColumn, Entity } from "typeorm";

import { BaseEntity } from "../base.entity";

@Entity()
export class SoftDeleteEntity extends BaseEntity {
  @ApiProperty({ description: "Дата удаления", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @DeleteDateColumn({ nullable: true, select: false, type: "timestamp" })
  deletedAt?: Date;

  @ApiProperty({ description: "Причина удаления", example: "Продавец Tameki больше не собирается его производить" })
  @Column({ nullable: true, select: false, type: "varchar" })
  deletionReason?: string;
}
