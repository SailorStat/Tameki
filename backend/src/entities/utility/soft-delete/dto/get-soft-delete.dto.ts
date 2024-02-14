import { IsBoolean } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformBoolean } from "@transform";
import { BaseGetDto } from "@utility/base/dto/get-base.dto";
import { IsOptional } from "class-validator";

export class SoftDeleteGetDto extends BaseGetDto {
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
