import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ImageModule } from "./entities/image/image.module";
import { ProductModule } from "./entities/product/product.module";

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
    ProductModule,
    ImageModule,
  ],
  providers: [],
})
export class AppModule {}
