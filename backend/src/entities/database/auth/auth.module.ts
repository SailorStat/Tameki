import { UserModule } from "@database/user/user.module";
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  exports: [AuthModule, JwtModule],
  imports: [
    JwtModule.register({ secret: process.env.PRIVATE_KEY || "SECRET", signOptions: { expiresIn: "24h" } }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
})
export class AuthModule {}
