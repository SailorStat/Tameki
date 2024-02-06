import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { SoftDeleteEntity } from "src/entities/softDelete/softDelete.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends SoftDeleteEntity {
  @ApiProperty({ description: "Артикул продавца", example: "12345" })
  @IsString()
  @Column({ nullable: true })
  article?: string;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй" })
  @IsString()
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ description: "Средняя оценка товара", example: 80 })
  @IsNumber()
  @Column({ default: 0 })
  estimation: number;

  @ApiProperty({ default: false, description: "Избранное", example: true })
  @IsBoolean()
  @Column({ default: false })
  favorites: boolean;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара" })
  @IsString()
  @Column({ nullable: true })
  hidingReason: string;

  @ApiProperty({ description: "Изображения товара", example: ["image1.jpg", "image2.jpg"] })
  @IsArray()
  @Column("simple-array", { nullable: true })
  images: string[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @IsNumber()
  @Column({ default: 0, nullable: false })
  inStock: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @IsArray()
  @Column("simple-array", { nullable: true })
  labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @IsNumber()
  @Column({ nullable: false })
  price: number;

  @ApiProperty({ description: "Отзывы", example: 20 })
  @IsNumber()
  @Column({ default: 0 })
  reviews: number;

  @ApiProperty({ description: "Продано количество раз", example: 50 })
  @IsNumber()
  @Column({ default: 0 })
  soldTimes: number;

  @ApiProperty({ description: "Название товара", example: "Пример продукта" })
  @IsString()
  @Column({ nullable: false })
  title: string;
}
