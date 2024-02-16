import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";

import { BaseService } from "../base/base.service";
import assertBlockedEntity from "./asserts/blocked-entity.assert";
import assertUnblockedEntity from "./asserts/unblocked-entity.assert";
import { BlockedStateEntity } from "./blocked-state.entity";
import { BlockedStateBlockDto } from "./dto/block-blocked-state.dto";
import { BlockedStateGetAllDto } from "./dto/get-all-blocked-state.dto";
import { BlockedStateGetDto } from "./dto/get-blocked-state.dto";

@Injectable()
export class BlockedStateService<
  Entity extends BlockedStateEntity,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
> extends BaseService<Entity, BlockedStateGetAllDto, BlockedStateGetDto, CreateDto, UpdateDto> {
  constructor(
    repository: Repository<Entity>,
    readonly entityName: string,
  ) {
    super(repository);
  }

  getBlockedStateModify = (
    queryBuilder: SelectQueryBuilder<Entity>,
    { searchBlocked }: BlockedStateGetDto,
  ): SelectQueryBuilder<Entity> => {
    !searchBlocked && queryBuilder.andWhere(`${this.entityName}.blockedAt IS NULL`);

    return queryBuilder;
  };

  getAll = async (params: BlockedStateGetAllDto): Promise<Entity[]> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName);

    this.getBaseModify(queryBuilder, params);
    this.getBaseManyModify(queryBuilder, params);

    return this.getBlockedStateModify(queryBuilder, params).getMany();
  };

  getByParams = async (params: BlockedStateGetDto & Partial<Entity>): Promise<Entity> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(params);

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getBlockedStateModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  };

  getById = async (entityId: Entity["id"], params: BlockedStateGetDto): Promise<Entity> => {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId });

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getBlockedStateModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  };

  create = async (createDto: CreateDto): Promise<Entity> => {
    const toCreateEntity = this.repository.create(createDto);
    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId: createdEntity.id })
      .getOne();
  };

  protected updateBlockedReason = async (
    entityId: Entity["id"],
    { blockedReason }: BlockedStateBlockDto,
  ): Promise<Entity> => {
    const entity = await this.getById(entityId, { searchBlocked: !blockedReason });

    assertFoundEntity(entity);
    blockedReason ? assertUnblockedEntity(entity) : assertBlockedEntity(entity);

    const toSaveEntity = this.repository.create({ ...entity, blockedReason });

    return this.repository.save(toSaveEntity);
  };

  block = async (entityId: Entity["id"], { blockedReason }: BlockedStateBlockDto) => {
    await this.updateBlockedReason(entityId, { blockedReason });

    return { message: "OK" };
  };

  unblock = async (entityId: Entity["id"]) => {
    return this.updateBlockedReason(entityId, { blockedReason: null });
  };
}
