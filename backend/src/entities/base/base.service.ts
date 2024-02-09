import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { BaseEntity } from "../base/base.entity";
import { BaseGetAllDto } from "./dto/get-all-base.dto";
import { BaseGetDto } from "./dto/get-base.dto";

type EntityId = BaseEntity["id"];

@Injectable()
export class BaseService<
  Entity extends BaseEntity,
  GetAllDto extends DeepPartial<BaseGetAllDto> = DeepPartial<BaseGetAllDto>,
  GetDto extends DeepPartial<BaseGetDto> = DeepPartial<BaseGetDto>,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async getAll({ page, limit, orderBy, ...params }: GetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("entity").where(params);

    page && limit && queryBuilder.offset((page - 1) * limit).limit(limit);

    orderBy && queryBuilder.orderBy(orderBy);

    return queryBuilder.getMany();
  }

  async getByParams(params: Partial<Entity & GetDto>): Promise<Entity> {
    const entity = await this.repository.createQueryBuilder("entity").where(params).getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async getById(entityId: EntityId, params: Partial<GetDto>): Promise<Entity> {
    const entity = await this.repository
      .createQueryBuilder("entity")
      .where("entity.id = :entityId", { entityId })
      .andWhere(params)
      .getOne();

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

  update = async (entityId: EntityId, updateDto: UpdateDto): Promise<Entity> => {
    await this.getById(entityId, {});

    await this.repository
      .createQueryBuilder("entity")
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set(updateDto as unknown as QueryDeepPartialEntity<Entity>)
      .where("entity.id = :entityId", { entityId })
      .execute();

    return this.getById(entityId, {});
  };

  async delete(entityId: EntityId, _: object) {
    await this.getById(entityId, {});
    await this.repository.createQueryBuilder().delete().where("id = :entityId", { entityId }).execute();

    return { message: "OK" };
  }
}
