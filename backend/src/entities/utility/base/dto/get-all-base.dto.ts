import { IsInt } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { IsOptional } from "class-validator";

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
