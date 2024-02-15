import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";

export class BlockedStateBlockDto {
  @ApiProperty({ description: "Причина скрытия", example: "Устаревшая информация", required: false })
  @IsString()
  readonly blockedReason: string;
}
