import { AddUserId, RequestWithUserId } from "@guards/jwt-auth.guard";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PurchaseCreateDto } from "./dto/create-purchase.dto";
import { PurchaseGetAllDto } from "./dto/get-all-purchase.dto";
import { ProductGetDto as PurchaseGetDto } from "./dto/get-purchase.dto";
import { ProductUpdateDto as PurchaseUpdateDto } from "./dto/update-purchase.dto";
import { PURCHASE_BASE_URL, URL_PURCHASE_ID_PARAM } from "./purchase.constants";
import { Purchase } from "./purchase.entity";
import { PurchaseService } from "./purchase.service";

@ApiTags("Заказы")
@Controller(PURCHASE_BASE_URL)
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @ApiOperation({ description: "Получить список всех доступных заказов", summary: "Получить все заказы" })
  @ApiResponse({ description: "Успешный поиск заказов", status: HttpStatus.OK, type: [Purchase] })
  @AddUserId()
  @Get()
  async getAll(@Query() getAllPurchasesDto: PurchaseGetAllDto) {
    const purchases = await this.purchaseService.getAll(getAllPurchasesDto);

    return purchases;
  }

  @ApiOperation({ description: "Получить заказ", summary: "Получить заказ" })
  @ApiResponse({ description: "Успешный поиск заказов", status: HttpStatus.OK, type: Purchase })
  @AddUserId()
  @Get(`/:${URL_PURCHASE_ID_PARAM}`)
  async getById(@Param(URL_PURCHASE_ID_PARAM) purchaseId: number, @Query() getPurchaseDto: PurchaseGetDto) {
    const purchase = await this.purchaseService.getById(purchaseId, getPurchaseDto);

    return purchase;
  }

  @ApiOperation({ description: "Создать заказ", summary: "Создать заказ" })
  @ApiResponse({ description: "Успешное создание заказа", status: HttpStatus.CREATED, type: Purchase })
  @AddUserId()
  @Post()
  async create(@Body() createDto: PurchaseCreateDto, @Req() { userId }: RequestWithUserId) {
    const purchase = await this.purchaseService.create({ ...createDto, buyerUserId: userId });

    return purchase;
  }

  @ApiOperation({ description: "Редактировать заказ", summary: "Редактировать заказ" })
  @ApiResponse({ description: "Успешное редактирование заказа", status: HttpStatus.OK, type: Purchase })
  @AddUserId()
  @Patch(`/:${URL_PURCHASE_ID_PARAM}`)
  async update(@Param(URL_PURCHASE_ID_PARAM) purchaseId: number, @Body() updatePurchaseDto: PurchaseUpdateDto) {
    const updatedPurchase = await this.purchaseService.update(purchaseId, updatePurchaseDto);

    return updatedPurchase;
  }

  @ApiOperation({ description: "Удалить заказ", summary: "Удалить заказ" })
  @ApiResponse({ description: "Успешное удаление заказа", status: HttpStatus.OK })
  @Delete(`/:${URL_PURCHASE_ID_PARAM}`)
  async delete(@Param(URL_PURCHASE_ID_PARAM) purchaseId: number) {
    const purchase = await this.purchaseService.delete(purchaseId);

    return purchase;
  }
}
