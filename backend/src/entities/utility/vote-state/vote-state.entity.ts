import { IsBoolean, IsNumber } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformBoolean, TransformNumber } from "@transform";
import { BaseEntity } from "@utility/base/base.entity";
import { IsOptional } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity()
export class VoteState extends BaseEntity {
  @ApiProperty({ description: "Оценка пользователя", example: true })
  @IsBoolean()
  @IsOptional()
  @TransformBoolean()
  @Column({ nullable: true })
  vote?: boolean;

  @ApiProperty({ description: "ID пользователя", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column()
  userId: number;

  // добавить связь с пользователем

  // добавить связь с оцениваемой сущностью
}
