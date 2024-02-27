import { AuthModule } from "@database/auth/auth.module";
import { ProductModule } from "@database/product/product.module";
import { ProductImageModule } from "@database/product-image/product-image.module";
import { ReviewModule } from "@database/review/review.module";
import { ReviewImageModule } from "@database/review-image/review-image.module";
import { ReviewVoteStateModule } from "@database/review-vote-state/review-vote-state.module";
import { RoleModule } from "@database/role/role.module";
import { UserModule } from "@database/user/user.module";
import { UserImageModule } from "@database/user-image/user-image.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

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
    ReviewModule,
    ReviewImageModule,
    ReviewVoteStateModule,
  ],
  providers: [],
})
export class AppModule {}
