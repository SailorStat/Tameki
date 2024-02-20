import { RoleModule } from "@database/role/role.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserImageModule } from "../user-image/user-image.module";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), UserImageModule, RoleModule],
  providers: [UserService],
})
export class UserModule {}
