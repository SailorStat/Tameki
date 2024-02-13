import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { ProductModule } from "./entities/product/product.module";
import { ProductImageModule } from "./entities/product-image/product-image.module";

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
    ProductModule,
    ProductImageModule,
  ],
  providers: [],
})
export class AppModule {}
