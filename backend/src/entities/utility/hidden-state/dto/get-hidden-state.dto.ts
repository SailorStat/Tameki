import { IsBoolean } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformBoolean } from "@transform";
import { BaseGetDto } from "@utility/base/dto/get-base.dto";
import { IsOptional } from "class-validator";

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
