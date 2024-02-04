import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ProductCreationAttributes {
  article?: string;
  description: string;
  images: string[];
  inStock: number;
  labels: string[];
  price: number;
  reasonHiding?: string;
  title: string;
}

@Table
export class Product extends Model<Product, ProductCreationAttributes> {
  @ApiProperty({ description: "Артикул продавца", example: "12345" })
  @Column({ type: DataType.STRING })
  article: string | null;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй" })
  @Column({ allowNull: false, type: DataType.STRING })
  description: string;

  @ApiProperty({ description: "Средняя оценка товара", example: 80 })
  @Column({ defaultValue: 0, type: DataType.INTEGER })
  estimation: number;

  @ApiProperty({ description: "Избранное", example: true })
  @Column({ type: DataType.BOOLEAN })
  favorites: boolean;

  @ApiProperty({ description: "Уникальный идентификатор товара", example: 1223233 })
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ description: "Изображения товара", example: ["image1.jpg", "image2.jpg"] })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @Column({ allowNull: false, type: DataType.INTEGER })
  inStock: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара" })
  @Column({ type: DataType.STRING })
  reasonHiding: string | null;

  @ApiProperty({ description: "Отзывы", example: 20 })
  @Column({ defaultValue: 0, type: DataType.INTEGER })
  reviews: number;

  @ApiProperty({ description: "Продано количество раз", example: 50 })
  @Column({ defaultValue: 0, type: DataType.INTEGER })
  soldTimes: number;

  @ApiProperty({ description: "Название товара", example: "Пример продукта" })
  @Column({ allowNull: false, type: DataType.STRING })
  title: string;
}
