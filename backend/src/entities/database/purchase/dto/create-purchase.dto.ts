import { IsNumber } from "@constraints";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { IsOptional } from "class-validator";

import { Purchase } from "../purchase.entity";

export class PurchaseCreateDto extends PickType(Purchase, ["sellerUserId", "productId"]) {
  @ApiProperty({ description: "Количество товаров", example: 10 })
  @IsNumber()
  @IsOptional()
  @TransformNumber()
  productCount: number;
}

export class PurchaseServiceCreateDto extends IntersectionType(
  PurchaseCreateDto,
  PickType(Purchase, ["buyerUserId"]),
) {}
