import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.d";

import { BaseService } from "../base/base.service";
import assertDeletedEntity from "./asserts/deleted-entity.assert";
import { SoftDeleteDeleteDto } from "./dto/delete-soft-delete.dto";
import { SoftDeleteGetAllDto } from "./dto/get-all-soft-delete.dto";
import { SoftDeleteGetDto } from "./dto/get-soft-delete.dto";
import { SoftDeleteEntity } from "./soft-delete.entity";

@Injectable()
export class SoftDeleteService<
  Entity extends SoftDeleteEntity,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
> extends BaseService<Entity, SoftDeleteGetAllDto, SoftDeleteGetDto, CreateDto, UpdateDto> {
  constructor(
    repository: Repository<Entity>,
    readonly entityName: string,
  ) {
    super(repository);
  }

  getSoftDeleteModify = (
    queryBuilder: SelectQueryBuilder<Entity>,
    { searchDeleted }: SoftDeleteGetDto,
  ): SelectQueryBuilder<Entity> => {
    searchDeleted && queryBuilder.withDeleted();

    return queryBuilder;
  };

  async getAll(params: SoftDeleteGetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName);

    this.getBaseModify(queryBuilder, params);
    this.getBaseManyModify(queryBuilder, params);

    return this.getSoftDeleteModify(queryBuilder, params).getMany();
  }

  async getByParams(params: Partial<Entity> & SoftDeleteGetDto): Promise<Entity> {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(params);

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getSoftDeleteModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async getById(entityId: Entity["id"], params: SoftDeleteGetDto): Promise<Entity> {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId });

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getSoftDeleteModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async delete(entityId: Entity["id"], { deletionReason }: SoftDeleteDeleteDto) {
    await this.getById(entityId, {});

    await this.repository
      .createQueryBuilder()
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ deletedAt: new Date(), deletionReason } as unknown as QueryDeepPartialEntity<Entity>)
      .where("id = :entityId", { entityId })
      .execute();

    return { message: "OK" };
  }

  async restore(entityId: Entity["id"]): Promise<Entity> {
    const entity = await this.repository
      .createQueryBuilder(this.entityName)
      .withDeleted()
      .select([`${this.entityName}.deletedAt`, `${this.entityName}.deletionReason`])
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .getOne();

    assertFoundEntity(entity);
    assertDeletedEntity(entity);

    await this.repository
      .createQueryBuilder(this.entityName)
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ deletedAt: null, deletionReason: null } as QueryDeepPartialEntity<Entity>)
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .execute();

    const updatedEntity = await this.getById(entityId, {});

    assertFoundEntity(updatedEntity);

    return updatedEntity;
  }
}
