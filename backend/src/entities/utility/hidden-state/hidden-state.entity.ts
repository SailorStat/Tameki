import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
// при изменении обновить product.entity.ts
export class HiddenStateEntity extends BaseEntity {
  @ApiProperty({ description: "Дата скрытия", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  hiddenAt: Date;

  @ApiProperty({ description: "Причина скрытия", example: "Закончились остатки товара, пока нет планов производить" })
  @Column({ nullable: true, select: false, type: "varchar" })
  hiddenReason?: string;
}
