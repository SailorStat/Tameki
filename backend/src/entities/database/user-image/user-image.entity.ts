import { IsNumber } from "@constraints";
import { ApiProperty } from "@nestjs/swagger";
import { TransformNumber } from "@transform";
import { Image } from "@utility/image/image.entity";
import { Column, Entity, ManyToOne } from "typeorm";

import { User } from "../user/user.entity";

@Entity()
export class UserImage extends Image {
  @ApiProperty({ description: "ID товара", example: 1234 })
  @IsNumber()
  @TransformNumber()
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}
