import { IsString } from "@constraints";
import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "@utility/base/base.entity";
import { IsEnum } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { RoleNames } from "./role.constants";

@Entity()
export class Role extends BaseEntity {
  @Column({ nullable: false })
  @IsEnum(RoleNames)
  @ApiProperty({ description: "Роль", example: "Название роли" })
  name: RoleNames;

  @Column({ nullable: false })
  @IsString()
  @ApiProperty({ description: "Описание роли", example: "Полный доступ к базе данных" })
  description: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({ name: "user_roles" })
  users: User[];
}
