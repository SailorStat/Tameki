import { ApiProperty } from "@nestjs/swagger";
import { TransformJSON } from "@transform";
import { IsIn, IsOptional } from "class-validator";

export class BaseGetDto {
  @ApiProperty({
    description: "Поле для сортировки результатов",
    example: { fieldName: "createdAt", order: "ASC" },
    required: false,
  })
  @IsOptional()
  @IsIn(["ASC", "DESC"])
  @TransformJSON()
  orderBy?: Record<string, "ASC" | "DESC">;
}
