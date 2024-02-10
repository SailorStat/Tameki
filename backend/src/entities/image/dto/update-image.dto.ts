import { PickType } from "@nestjs/swagger";

import { Image } from "../image.entity";

export default class UpdateImageDto extends PickType(Image, ["alt", "description"]) {}
