import { PickType } from "@nestjs/swagger";

import { Image } from "../image.entity";

export default class CreateImageDto extends PickType(Image, ["alt", "description", "hidingReason"]) {}
