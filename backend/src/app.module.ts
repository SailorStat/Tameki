import { AuthService } from "@database/auth/auth.service";
import { ProductModule } from "@database/product/product.module";
import { ProductImageModule } from "@database/product-image/product-image.module";
import { RoleModule } from "@database/role/role.module";
import { UserModule } from "@database/user/user.module";
import { UserImageModule } from "@database/user-image/user-image.module";
import { JwtAuthGuard } from "@guards/jwt-auth.guard";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { AuthModule } from "./entities/database/auth/auth.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV === "development" ? ".development" : ""}.env` }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoLoadEntities: true,
        database: config.get<string>("POSTGRES_DB"),
        entities: [__dirname, "dist/**/*.entity.ts"],
        host: config.get<string>("POSTGRES_HOST"),
        logging: true,
        password: config.get<string>("POSTGRES_PASSWORD"),
        port: config.get<number>("POSTGRES_PORT"),
        synchronize: true,
        type: "postgres",
        username: config.get<string>("POSTGRES_USER"),
      }),
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "..", process.env.UPLOADS_PATH) }),
    MulterModule.register({ dest: process.env.UPLOADS_PATH }),
    AuthModule,
    RoleModule,
    UserModule,
    UserImageModule,
    ProductModule,
    ProductImageModule,
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtAuthGuard }, JwtStrategy],
})
export class AppModule {}
