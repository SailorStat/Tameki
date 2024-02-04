import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { Product } from "./entities/product/product.model";
import { ProductModule } from "./entities/product/product.module";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV === "development" ? ".development" : ""}.env` }),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      database: process.env.POSTGRES_DB,
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      models: [Product],
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
    }),
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
