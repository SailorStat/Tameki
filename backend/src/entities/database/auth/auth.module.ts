import { UserModule } from "@database/user/user.module";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  exports: [AuthModule, JwtModule],
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
})
export class AuthModule {}
