import { Role } from "@database/role/role.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserImageModule } from "../user-image/user-image.module";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), UserImageModule, TypeOrmModule.forFeature([Role])],
  providers: [UserService],
})
export class UserModule {}
