import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { BaseEntity } from "../base/base.entity";
import { BaseGetAllDto } from "./dto/get-all-base.dto";
import { BaseGetDto } from "./dto/get-base.dto";

@Injectable()
export class BaseService<
  Entity extends BaseEntity,
  GetAllDto extends BaseGetAllDto = BaseGetAllDto,
  GetDto extends BaseGetDto = BaseGetDto,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto = object,
> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async getAll({ page, limit, orderBy, leftJoinAndSelect, ...params }: GetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("entity").where(params);

    leftJoinAndSelect && queryBuilder.leftJoinAndSelect(...leftJoinAndSelect);
    page && limit && queryBuilder.offset((page - 1) * limit).limit(limit);
    orderBy && queryBuilder.orderBy(orderBy);

    return queryBuilder.getMany();
  }

  async getByParams({ leftJoinAndSelect, ...params }: GetDto & Partial<Entity>): Promise<Entity> {
    const queryBuilder = await this.repository.createQueryBuilder("entity").where(params);

    leftJoinAndSelect && queryBuilder.leftJoinAndSelect(...leftJoinAndSelect);

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async getById(entityId: number, { leftJoinAndSelect, ...params }: GetDto): Promise<Entity> {
    const queryBuilder = await this.repository
      .createQueryBuilder("entity")
      .where("entity.id = :entityId", { entityId })
      .andWhere(params);

    leftJoinAndSelect && queryBuilder.leftJoinAndSelect(...leftJoinAndSelect);

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  create = async (createDto: CreateDto): Promise<Entity> => {
    const toCreateEntity = this.repository.create(createDto);
    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder("entity")
      .where("entity.id = :entityId", { entityId: createdEntity.id })
      .getOne();
  };

  update = async (entityId: number, updateDto: UpdateDto): Promise<Entity> => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    await this.getById(entityId, {} as GetDto);

    await this.repository
      .createQueryBuilder("entity")
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set(updateDto as unknown as QueryDeepPartialEntity<Entity>)
      .where("entity.id = :entityId", { entityId })
      .execute();

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.getById(entityId, {} as GetDto);
  };

  async delete(entityId: number, _: object) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    await this.getById(entityId, {} as GetDto);
    await this.repository.createQueryBuilder().delete().where("id = :entityId", { entityId }).execute();

    return { message: "OK" };
  }
}
