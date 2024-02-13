import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsInt } from "src/validation/check";
import { TransformNumber } from "src/validation/transform/transformNumber";

import { BaseGetDto } from "./get-base.dto";

export class BaseGetAllDto extends BaseGetDto {
  @ApiProperty({ description: "Количество элементов на страницу", example: 10, required: false })
  @IsInt()
  @IsOptional()
  @TransformNumber()
  limit?: number;

  @ApiProperty({ description: "Номер страницы для запроса", example: 1, required: false })
  @IsInt()
  @IsOptional()
  @TransformNumber()
  page?: number;
}
