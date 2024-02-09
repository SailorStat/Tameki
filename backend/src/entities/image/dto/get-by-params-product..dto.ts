import { IntersectionType, PartialType } from "@nestjs/swagger";

import { Image } from "../image.entity";
import GetImageDto from "./get-image..dto";

export default class GetImageByParamsDto extends PartialType(IntersectionType(GetImageDto, Image)) {}
