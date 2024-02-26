import { IsNumber, IsString } from "@constraints";
import { Product } from "@database/product/product.entity";
import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BlockedStateEntity } from "@utility/blocked-state/blocked-state.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Review extends BlockedStateEntity {
  @ApiProperty({ description: "Текст отзыва", example: "Отличный продукт, всем рекомендую!" })
  @IsString()
  @Column({ nullable: true, type: "text" })
  text: string;

  @ApiProperty({ description: "Изображения", example: ["image1.jpg", "image2.jpg"] })
  @Column({ array: true, nullable: true, type: "text" })
  images: string[];

  @ApiProperty({ description: "Оценка отзыва", example: 100 })
  @IsNumber()
  @Column({ type: "int" })
  rating: number;

  // TODO: добавить сущности для лайков и дизлайков
  @ApiProperty({ description: "Количество лайков", example: 10 })
  @Column({ default: 0, type: "int" })
  likes: number;

  @ApiProperty({ description: "Количество дизлайков", example: 2 })
  @Column({ default: 0, type: "int" })
  dislikes: number;

  @ApiProperty({ description: "Пользователь, оставивший отзыв" })
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ApiProperty({ description: "Продукт, к которому относится отзыв" })
  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  // TODO: добавить связь с информацией о покупке
  // @ApiProperty({ description: "Информация о покупке" })
  // @ManyToOne(type => Purchase)
  // purchase: Purchase;
}
