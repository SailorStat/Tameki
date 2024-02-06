import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsBoolean } from "src/validationDecorators";

export class SoftDeleteGetDto {
  @ApiProperty({
    default: false,
    description: "Искать среди удалённых",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  searchDeleted?: boolean;
}
