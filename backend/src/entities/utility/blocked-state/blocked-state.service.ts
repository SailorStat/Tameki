import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.d";

import { BaseService } from "../base/base.service";
import assertBlockedEntity from "./asserts/blocked-entity.assert";
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

    createDto.blockedReason && (toCreateEntity.blockedAt = new Date());

    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId: createdEntity.id })
      .getOne();
  };

  block = async (entityId: Entity["id"], { blockedReason }: BlockedStateBlockDto) => {
    await this.getById(entityId, {});

    await this.repository
      .createQueryBuilder()
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ blockedAt: new Date(), blockedReason } as unknown as QueryDeepPartialEntity<Entity>)
      .where("id = :entityId", { entityId })
      .execute();

    return { message: "OK" };
  };

  unblock = async (entityId: Entity["id"]): Promise<Entity> => {
    const entity = await this.repository
      .createQueryBuilder(this.entityName)
      .withDeleted()
      .select([`${this.entityName}.blockedAt`, `${this.entityName}.blockedReason`])
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .getOne();

    assertFoundEntity(entity);
    assertBlockedEntity(entity);

    await this.repository
      .createQueryBuilder(this.entityName)
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ blockedAt: null, blockedReason: null } as QueryDeepPartialEntity<Entity>)
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .execute();

    return this.getById(entityId, {});
  };
}
