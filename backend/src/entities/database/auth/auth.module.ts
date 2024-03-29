import { UserModule } from "@database/user/user.module";
import { JwtAuthGuard } from "@guards/jwt-auth.guard";
import { RoleGuard } from "@guards/role.guard";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { Auth } from "./auth.entity";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    UserModule,
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class AuthModule {}
