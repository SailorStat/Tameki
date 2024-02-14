import { IsString } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";

export class SoftDeleteDeleteDto {
  @ApiProperty({ description: "Причина удаления", example: "Больше нет необходимости", required: false })
  @IsString()
  readonly deletionReason: string;
}
