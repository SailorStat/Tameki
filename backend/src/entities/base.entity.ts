import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @ApiProperty({ description: "Уникальный идентификатор", example: 1223233, readOnly: true, uniqueItems: true })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ description: "Дата создания" })
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Дата изменения" })
  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  updatedAt: Date;
}