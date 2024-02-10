import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseGetAllDto } from "src/entities/base/dto/get-all-base.dto";
import { IsBoolean } from "src/validation/check";
import { TransformBoolean } from "src/validation/transform/transformBoolean";

export class SoftDeleteGetAllDto extends BaseGetAllDto {
  @ApiProperty({
    default: false,
    description: "Искать среди удалённых",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @TransformBoolean()
  searchDeleted?: boolean;
}
