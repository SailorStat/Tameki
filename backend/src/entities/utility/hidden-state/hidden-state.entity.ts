import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
// при изменении обновить product.entity.ts
export class HiddenStateEntity extends BaseEntity {
  @ApiProperty({ description: "Дата скрытия", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ nullable: true, type: "timestamp" })
  hiddenAt?: Date;

  @ApiProperty({ description: "Причина скрытия", example: "Закончились остатки товара, пока нет планов производить" })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, type: "varchar" })
  hiddenReason?: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateHiddenAt() {
    this.hiddenAt = !this.hiddenReason ? null : new Date();
  }
}
