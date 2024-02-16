import { IsUUID } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity()
export class FileEntity extends BaseEntity {
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
