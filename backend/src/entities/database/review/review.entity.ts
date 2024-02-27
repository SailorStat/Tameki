import { IsNumber, IsString } from "@constraints";
import { Product } from "@database/product/product.entity";
import { ReviewImage } from "@database/review-image/review-image.entity";
import { ReviewVoteState } from "@database/review-vote-state/review-vote-state.entity";
import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { BlockedStateEntity } from "@utility/blocked-state/blocked-state.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Review extends BlockedStateEntity {
  @ApiProperty({ description: "Текст отзыва", example: "Отличный продукт, всем рекомендую!" })
  @IsString()
  @Column({ nullable: true, type: "text" })
  text: string;

  @ApiProperty({ description: "Изображения", example: ["image1.jpg", "image2.jpg"] })
  @OneToMany(() => ReviewImage, (image) => image.review)
  images: ReviewImage[];

  @ApiProperty({ description: "Оценка отзыва", example: 100 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  rating: number;

  @ApiProperty({ description: "ID пользователя", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  userId: number;

  @ApiProperty({ description: "Пользователь, оставивший отзыв", type: () => User })
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ApiProperty({ description: "ID продукта", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ type: "int" })
  productId: number;

  @ApiProperty({ description: "Продукт, к которому относится отзыв" })
  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ApiProperty({ description: "Оценки к отзыву" })
  @OneToMany(() => ReviewVoteState, (vote) => vote.review)
  votes: ReviewVoteState;

  // TODO: добавить связь с информацией о покупке
  // @ApiProperty({ description: "Информация о покупке" })
  // @ManyToOne(type => Purchase)
  // purchase: Purchase;
}
