import { UserModule } from "@database/user/user.module";
import { JwtAuthGuard } from "@guards/jwt-auth.guard";
import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/strategies/jwt.strategy";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  exports: [AuthModule, JwtModule],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
