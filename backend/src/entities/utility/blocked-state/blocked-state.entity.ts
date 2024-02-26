import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
// при изменении поправить user.entity.ts, review.entity.ts
export class BlockedStateEntity extends BaseEntity {
  @ApiProperty({ description: "Дата блокировки", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ nullable: true, select: false, type: "timestamp" })
  blockedAt: Date;

  @ApiProperty({ description: "Причина блокировки", example: "Множественные оскорбления" })
  @IsString()
  @Column({ nullable: true, select: false, type: "varchar" })
  blockedReason?: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateBlockedAt() {
    this.blockedAt = !this.blockedReason ? null : new Date();
  }
}
