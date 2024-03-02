import { PickType } from "@nestjs/swagger";

import { Image } from "../image.entity";

export class UpdateImageDto extends PickType(Image, ["alt", "description"]) {}
