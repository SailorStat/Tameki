import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
export class SoftDeleteEntity extends BaseEntity {
  @ApiProperty({ description: "Причина удаления", example: "Продавец Tameki больше не собирается его производить" })
  @IsString()
  @Column({ nullable: true, select: false, type: "varchar" })
  deletionReason?: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateDeletedAt() {
    this.deletedAt = !this.deletionReason ? null : new Date();
  }
}
