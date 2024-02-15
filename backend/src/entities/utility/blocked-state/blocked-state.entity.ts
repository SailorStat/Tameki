import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
// при изменении поправить user.entity.ts
export class BlockedStateEntity extends BaseEntity {
  @ApiProperty({ description: "Дата блокировки", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  blockedAt: Date;

  @ApiProperty({ description: "Причина блокировки", example: "Множественные оскорбления" })
  @Column({ nullable: true, select: false, type: "varchar" })
  blockedReason?: string;
}
