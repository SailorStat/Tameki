import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PurchaseController } from "./purchase.controller";
import { Purchase } from "./purchase.entity";
import { PurchaseService } from "./purchase.service";

@Module({
  controllers: [PurchaseController],
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchaseService],
})
export class PurchaseModule {}
