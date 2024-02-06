import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "src/validationDecorators";

export class SoftDeleteDeleteDto {
  @ApiProperty({ description: "Причина удаления", example: "Больше нет необходимости", required: false })
  @IsString()
  readonly deletionReason: string;
}
