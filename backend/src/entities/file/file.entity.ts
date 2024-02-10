import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "src/validation/check";
import { Column, DeleteDateColumn, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
export class FileEntity extends BaseEntity {
  @ApiProperty({ description: "Дата удаления", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @DeleteDateColumn({ nullable: true, select: false, type: "timestamp" })
  deletedAt?: Date;

  @ApiProperty({ description: "Название файла", example: "конь-огонь" })
  @IsUUID()
  @Column({ type: String })
  filename: string;

  @ApiProperty({ description: "Путь к файлу", example: "3422b448-2460-4fd2-9183-8000de6f8343" })
  @IsUUID()
  @Column({ nullable: true })
  url: string;

  // В наследуемых сущностях добавить поле для связи oneToMany
}
