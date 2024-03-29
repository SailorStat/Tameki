import { PickType } from "@nestjs/swagger";

import { Image } from "../image.entity";

export class CreateImageDto extends PickType(Image, ["alt", "description"]) {}
