import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { BaseEntity } from "../base/base.entity";
import { BaseGetAllDto } from "./dto/get-all-base.dto";
import { BaseGetDto } from "./dto/get-base.dto";

@Injectable()
export class BaseService<
  Entity extends BaseEntity,
  GetDto extends BaseGetDto = BaseGetDto,
  GetAllDto extends BaseGetAllDto & GetDto = BaseGetAllDto & GetDto,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto = object,
> {
  readonly entityName: string = "entity";

  constructor(protected readonly repository: Repository<Entity>) {}

  protected getBaseModify = (
    queryBuilder: SelectQueryBuilder<Entity>,
    { orderBy }: GetDto,
  ): SelectQueryBuilder<Entity> => queryBuilder.orderBy(orderBy || { [`${this.entityName}.id`]: "ASC" });

  protected getBaseManyModify = (
    queryBuilder: SelectQueryBuilder<Entity>,
    params: GetAllDto,
  ): SelectQueryBuilder<Entity> => {
    const { page, limit } = params;

    queryBuilder.where(
      `${this.entityName}.id = (SELECT "id" FROM "${this.entityName}" ORDER BY "id" ASC LIMIT ${limit} OFFSET ${(page - 1) * limit})`,
    );
    this.getBaseModify(queryBuilder, params);

    return queryBuilder;
  };

  async getAll(params: GetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(params);

    this.getBaseManyModify(queryBuilder, params);

    return queryBuilder.getMany();
  }

  async getByParams(params: GetDto & Partial<Entity>): Promise<Entity> {
    const queryBuilder = await this.repository.createQueryBuilder(this.entityName).where(params);

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async getById(entityId: number, params?: GetDto): Promise<Entity> {
    const queryBuilder = await this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId });

    params && queryBuilder.andWhere(params);

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  create = async (createDto: CreateDto): Promise<Entity> => {
    const toCreateEntity = this.repository.create(createDto);
    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId: createdEntity.id })
      .getOne();
  };

  update = async (entityId: number, updateDto: UpdateDto): Promise<Entity> => {
    await this.getById(entityId);

    await this.repository
      .createQueryBuilder(this.entityName)
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set(updateDto as unknown as QueryDeepPartialEntity<Entity>)
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .execute();

    return this.getById(entityId);
  };

  async delete(entityId: number, _: object) {
    await this.getById(entityId);
    await this.repository.createQueryBuilder().delete().where("id = :entityId", { entityId }).execute();

    return { message: "OK" };
  }
}
