import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsArray, IsNumber, IsString } from "src/validationDecorators";

export default class CreateProductDto {
  @ApiProperty({ description: "Артикул продавца", example: "a12s38", required: false })
  @IsString()
  @IsOptional()
  readonly article?: string;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй" })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: "Изображения товара", example: ["image1.jpg", "image2.jpg"] })
  @IsString({ each: true })
  @IsArray()
  readonly images: string[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15 })
  @IsNumber()
  readonly inStock: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"] })
  @IsString({ each: true })
  @IsArray()
  readonly labels: string[];

  @ApiProperty({ description: "Цена", example: 99 })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара", required: false })
  @IsString()
  readonly reasonHiding?: string;

  @ApiProperty({ description: "Название товара", example: "Пример продукта" })
  @IsString()
  readonly title: string;
}
