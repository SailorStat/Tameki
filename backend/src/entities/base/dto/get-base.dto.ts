import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { TransformJSON } from "src/validation/transform/transformJSON";

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
