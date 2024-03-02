import { IsEnum, IsNumber } from "@constraints";
import { Product } from "@database/product/product.entity";
import { Review } from "@database/review/review.entity";
import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { BaseEntity } from "@utility/base/base.entity";
import { IsOptional } from "class-validator";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { PurchaseStatus } from "./purchase.constants";

@Entity()
export class Purchase extends BaseEntity {
  @ApiProperty({ description: "ID заказчика", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  buyerUserId: number;

  @ApiProperty({ description: "Пользователь, создавщий заказ", type: () => User })
  @ManyToOne(() => User, (user) => user.buyerPurchases)
  buyerUser: User;

  @ApiProperty({ description: "ID продавца", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  sellerUserId: number;

  @ApiProperty({ description: "Пользователь, создавщий заказ", type: () => User })
  @ManyToOne(() => User, (user) => user.sellerPurchases)
  sellerUser: User;

  @ApiProperty({ description: "ID продукта", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  productId: number;

  @ApiProperty({ description: "Продукт, к которому относится заказ" })
  @ManyToOne(() => Product, (product) => product.purchases)
  product: Product;

  @ApiProperty({ description: "Количество товаров", example: 10 })
  @IsNumber()
  @TransformNumber()
  @Column({ default: 1, type: "int" })
  productCount: number;

  @ApiProperty({ description: "Цена за товар", example: 1000 })
  @IsNumber()
  @TransformNumber()
  @Column({ nullable: true, type: "int" })
  pricePerProduct?: number;

  @ApiProperty({ description: "ID продукта", example: 1234 })
  @IsNumber()
  @IsOptional()
  @TransformNumber()
  @Column({ type: "int" })
  reviewId?: number;

  @ApiProperty({ description: "Оценка покупки" })
  @OneToOne(() => Review, (review) => review.purchase)
  review?: Review;

  @Column()
  @IsEnum(PurchaseStatus)
  @ApiProperty({ description: "Статус заказа", example: PurchaseStatus.Completed })
  status: PurchaseStatus;

  // @ApiProperty({ description: "Оплата" })
  // @OneToOne(() => Pay, (pay) => pay.purchase)
  // pay?: Pay;

  // @ApiProperty({ description: "Доставка" })
  // @OneToOne(() => Delivery, (delivery) => delivery.purchase)
  // delivery?: Delivery;
}
