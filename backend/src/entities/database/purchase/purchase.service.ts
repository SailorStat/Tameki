import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@utility/base/base.service";
import { assertFoundEntity } from "src/asserts/http.assert";
import { Repository, SelectQueryBuilder } from "typeorm";

import { PurchaseCreateServiceParams, PurchaseServiceCreateDto } from "./dto/create-purchase.dto";
import { PurchaseGetAllDto } from "./dto/get-all-purchases.dto";
import { Purchase } from "./purchase.entity";

@Injectable()
export class PurchaseService extends BaseService<
  Purchase,
  PurchaseGetDto,
  PurchaseGetAllDto,
  PurchaseCreateServiceParams,
  object
> {
  readonly entityName: string = "purchase";

  constructor(@InjectRepository(Purchase) protected readonly repository: Repository<Purchase>) {
    super(repository);
  }

  protected getPurchaseModify = (
    queryBuilder: SelectQueryBuilder<Purchase>,
    _?: PurchaseGetDto,
  ): SelectQueryBuilder<Purchase> => {
    return queryBuilder;
  };

  getAll = async (getAllPurchasesDto: PurchaseGetAllDto): Promise<Purchase[]> => {
    const { limit = 20, page = 1 } = getAllPurchasesDto;

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(this.getWhereParams(getAllPurchasesDto));

    this.getBaseModify(queryBuilder, getAllPurchasesDto);
    this.getPurchaseModify(queryBuilder, getAllPurchasesDto);

    return this.getBaseManyModify(queryBuilder, { ...getAllPurchasesDto, limit, page }).getMany();
  };

  getByParams = async (getByParamsDto: Partial<Purchase & PurchaseGetDto>): Promise<Purchase> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getByParamsDto));

    this.getPurchaseModify(queryBuilder);

    const purchase = await this.getBaseModify(queryBuilder, getByParamsDto).getOne();

    assertFoundEntity(purchase);

    return purchase;
  };

  getById = async (purchaseId: number, getPurchaseDto: PurchaseGetDto): Promise<Purchase> => {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :purchaseId`, { purchaseId });

    this.getPurchaseModify(queryBuilder);

    const purchase = await this.getBaseModify(queryBuilder, getPurchaseDto).getOne();

    assertFoundEntity(purchase);

    return purchase;
  };

  create = async (createDto: PurchaseServiceCreateDto) => {
    const toCreateEntity = this.repository.create(createDto);
    const createdPurchase = await this.repository.save(toCreateEntity);

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :purchaseId`, { purchaseId: createdPurchase.id });

    return this.getPurchaseModify(queryBuilder).getOne();
  };
}
