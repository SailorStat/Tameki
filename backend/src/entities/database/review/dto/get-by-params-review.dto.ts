import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

import { Review } from "../review.entity";
import { ReviewGetDto } from "./get-review.dto";

export class ReviewGetByParamsDto extends PartialType(IntersectionType(ReviewGetDto, OmitType(Review, ["images"]))) {}
