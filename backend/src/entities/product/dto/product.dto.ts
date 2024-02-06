import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { IsArray, IsInt, IsString } from "src/validationDecorators";

export default class ProductDto {
  @ApiProperty({ description: "Артикул продавца", example: "a12s38", required: false })
  @IsString()
  @IsOptional()
  readonly article?: string;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй" })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: "Средняя оценка товара", example: 85 })
  @IsInt()
  readonly estimation: number;

  @ApiProperty({ description: "Находится в избранном", example: true })
  @IsBoolean()
  readonly favorites: boolean;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара", required: false })
  @IsString()
  @IsOptional()
  readonly hidingReason?: string;

  @ApiProperty({ description: "Уникальный идентификатор товара", example: "31241" })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: "Изображения товара", example: ["image1.jpg", "image2.jpg"] })
  @IsString({ each: true })
  @IsArray()
  readonly images: string[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @IsInt()
  readonly inStock: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @IsString({ each: true })
  @IsArray()
  readonly labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @IsInt()
  readonly price: number;

  @ApiProperty({ description: "Количество отзывов", example: 18 })
  @IsInt()
  readonly reviews: number;

  @ApiProperty({ description: "Количество продаж", example: 60 })
  @IsInt()
  readonly soldTimes: number;

  @ApiProperty({ description: "Название товара", example: "Пример продукта" })
  @IsString()
  readonly title: string;
}
