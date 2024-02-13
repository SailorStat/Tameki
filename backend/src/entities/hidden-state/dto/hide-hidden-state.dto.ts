import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "src/validation/check";

export class HiddenStateHideDto {
  @ApiProperty({ description: "Причина скрытия", example: "Устаревшая информация", required: false })
  @IsString()
  readonly hiddenReason: string;
}
