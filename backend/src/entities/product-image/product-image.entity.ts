import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "src/validation/check";
import { TransformNumber } from "src/validation/transform/transformNumber";
import { Column, Entity, ManyToOne } from "typeorm";

import { Image } from "../image/image.entity";
import { Product } from "../product/product.entity";

@Entity()
export class ProductImage extends Image {
  @ApiProperty({ description: "ID товара", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
