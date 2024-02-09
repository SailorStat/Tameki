import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsDate, IsString, IsUUID } from "src/validation/check";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { SoftDeleteEntity } from "../softDelete/softDelete.entity";

@Entity()
export class Image extends OmitType(SoftDeleteEntity, ["id"]) {
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

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара" })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  hidingReason?: string;

  @ApiProperty({ description: "Дата удаления изображения", example: null })
  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ nullable: true, select: false, type: "timestamp" })
  deletedAt?: Date;

  @ApiProperty({ description: "Изображения товара", example: "3422b448-2460-4fd2-9183-8000de6f8343" })
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
