import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { IsArray, IsInt, IsString } from "src/validationDecorators";

export default class UpdateProductDto {
  @ApiProperty({ description: "Артикул продавца", example: "a12s38", required: false })
  @IsString()
  @IsOptional()
  readonly article?: string;

  @ApiProperty({ description: "Описание товара", example: "Очень хороший товар, купили всей семьёй", required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: "Средняя оценка товара", example: 85, required: false })
  @IsInt()
  @IsOptional()
  readonly estimation?: number;

  @ApiProperty({ description: "Находится в избранном", example: true, required: false })
  @IsBoolean()
  @IsOptional()
  readonly favorites?: boolean;

  @ApiProperty({ description: "Изображения товара", example: ["image1.jpg", "image2.jpg"], required: false })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly images?: string[];

  @ApiProperty({ description: "Количество штук в наличии", example: 15, required: false })
  @IsInt()
  @IsOptional()
  readonly inStock?: number;

  @ApiProperty({ description: "Ключевые слова", example: ["новый", "распродажа"], required: false })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly labels?: string[];

  @ApiProperty({ description: "Цена", example: 99, required: false })
  @IsInt()
  @IsOptional()
  readonly price?: number;

  @ApiProperty({ description: "Количество продаж", example: 60, required: false })
  @IsInt()
  @IsOptional()
  readonly soldTimes?: number;

  @ApiProperty({ description: "Причина скрытия товара", example: "Черновик товара", required: false })
  @IsString()
  @IsOptional()
  readonly reasonHiding?: string;

  @ApiProperty({ description: "Название товара", example: "Пример продукта", required: false })
  @IsString()
  @IsOptional()
  readonly title?: string;
}
