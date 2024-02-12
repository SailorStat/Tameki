import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { SoftDeleteEntity } from "src/entities/soft-delete/soft-delete.entity";
import { TransformBoolean } from "src/validation/transform/transformBoolean";
import { TransformJSON } from "src/validation/transform/transformJSON";
import { TransformNumber } from "src/validation/transform/transformNumber";
import { Column, Entity, OneToMany } from "typeorm";

import { ProductImage } from "../product-image/product-image.entity";

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
  @TransformNumber()
  estimation: number;

  @ApiProperty({ default: false, description: "Избранное", example: true })
  @IsBoolean()
  @Column({ default: false })
  @TransformBoolean()
  favorites: boolean;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара" })
  @IsString()
  @Column({ nullable: true })
  hidingReason: string;

  @ApiProperty({ description: "Изображения товара", isArray: true, type: () => ProductImage })
  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @IsNumber()
  @Column({ default: 0, nullable: false })
  @TransformNumber()
  inStock: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @IsArray()
  @Column("simple-array", { nullable: true })
  @TransformJSON()
  labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @IsNumber()
  @Column({ nullable: false })
  @TransformNumber()
  price: number;

  @ApiProperty({ description: "Отзывы", example: 20 })
  @IsNumber()
  @Column({ default: 0 })
  @TransformNumber()
  reviews: number;

  @ApiProperty({ description: "Продано количество раз", example: 50 })
  @IsNumber()
  @Column({ default: 0 })
  @TransformNumber()
  soldTimes: number;

  @ApiProperty({ description: "Название товара", example: "Пример продукта" })
  @IsString()
  @Column({ nullable: false })
  title: string;
}
