import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";

export class HiddenStateHideDto {
  @ApiProperty({ description: "Причина скрытия", example: "Устаревшая информация", required: false })
  @IsString()
  readonly hiddenReason: string;
}
