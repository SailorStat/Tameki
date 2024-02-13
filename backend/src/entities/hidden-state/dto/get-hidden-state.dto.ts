import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseGetDto } from "src/entities/base/dto/get-base.dto";
import { IsBoolean } from "src/validation/check";
import { TransformBoolean } from "src/validation/transform/transformBoolean";

export class HiddenStateGetDto extends BaseGetDto {
  @ApiProperty({
    default: false,
    description: "Искать среди скрытых",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @TransformBoolean()
  searchHidden?: boolean;
}
