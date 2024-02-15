import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleController } from "./role.controller";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
})
export class RoleModule {}
