import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "src/validation/check";

export class SoftDeleteDeleteDto {
  @ApiProperty({ description: "Причина удаления", example: "Больше нет необходимости", required: false })
  @IsString()
  readonly deletionReason: string;
}
