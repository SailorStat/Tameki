import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "src/validation/check";
import { TransformNumber } from "src/validation/transform/transformNumber";
import { Column, Entity } from "typeorm";

import { Image } from "../image/image.entity";

@Entity()
export class ProductImage extends Image {
  @ApiProperty({ description: "ID товара", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ nullable: false })
  productId: number;
}
