import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "src/validation/transform/transformNumber";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
