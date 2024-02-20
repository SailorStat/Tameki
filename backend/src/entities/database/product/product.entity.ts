import { IsArray, IsBoolean, IsNumber, IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformBoolean, TransformJSON, TransformNumber } from "@transform";
import { SoftDeleteEntity } from "@utility/soft-delete/soft-delete.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";

import { ProductImage } from "../product-image/product-image.entity";

@Entity()
export class Product extends SoftDeleteEntity {
  // Это копия из HiddenStateEntity. Сделана из-за невозможности множественного наследования
  @ApiProperty({ description: "Дата скрытия", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ nullable: true, type: "timestamp" })
  hiddenAt: Date;

  @ApiProperty({ description: "Причина скрытия", example: "Закончились остатки товара, пока нет планов производить" })
  @IsString()
  @Column({ nullable: true, type: "varchar" })
  hiddenReason?: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateHiddenAt() {
    this.hiddenAt = !this.hiddenReason ? null : new Date();
  }
  // ----------------------------------------------------------------------------------------

  @ApiProperty({ description: "Артикул продавца", example: "12345" })
  @IsString()
  @Column({ nullable: true })
  article?: string;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй" })
  @IsString()
  @Column()
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

  @ApiProperty({ description: "Изображения товара", isArray: true, type: () => ProductImage })
  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @IsNumber()
  @Column({ default: 0 })
  @TransformNumber()
  inStock: number;

  // TODO: добавить таблицу с леблами
  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @IsArray()
  @Column("simple-array", { nullable: true })
  @TransformJSON()
  labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @IsNumber()
  @Column()
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
  @Column()
  title: string;
}
