import { IsNumber } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { Image } from "@utility/image/image.entity";
import { Column, Entity, ManyToOne } from "typeorm";

import { Product } from "../product/product.entity";

@Entity()
export class ProductImage extends Image {
  @ApiProperty({ description: "ID товара", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column()
  productId: number;

  @ApiProperty({ description: "Продукт, которому принадлежит изображение", type: () => Product })
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
