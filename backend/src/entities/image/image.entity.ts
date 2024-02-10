import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsString } from "src/validation/check";
import { Column, Entity } from "typeorm";

import { FileEntity } from "../file/file.entity";

@Entity()
export class Image extends FileEntity {
  @ApiProperty({ description: "Текст вместо картинки", example: "Лошадь купается в реке" })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  alt?: string;

  @ApiProperty({ description: "Описание картинки", example: "Главное фото товара, нужно поставить на первое место" })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  description?: string;
}
