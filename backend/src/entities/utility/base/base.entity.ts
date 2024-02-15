import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @ApiProperty({ description: "Уникальный идентификатор", example: 1223233, readOnly: true, uniqueItems: true })
  @PrimaryGeneratedColumn()
  @TransformNumber()
  id: number;

  @ApiProperty({ description: "Дата создания" })
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Дата изменения" })
  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  updatedAt: Date;

  @ApiProperty({ description: "Дата удаления", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @DeleteDateColumn({ nullable: true, select: false, type: "timestamp" })
  deletedAt?: Date;
}
