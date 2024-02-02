import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import AppController from "./app.controller";
import AppService from "./app.service";

@Module({
  controllers: [AppController],
  imports: [
    SequelizeModule.forRoot({
      autoLoadModels: true,
      database: "sailor-friends",
      dialect: "postgres",
      host: "localhost",
      models: [],
      password: "root",
      port: 5432,
      username: "root",
    }),
  ],
  providers: [AppService],
})
export default class AppModule {}
