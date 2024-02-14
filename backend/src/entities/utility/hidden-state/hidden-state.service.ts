import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.d";

import { BaseService } from "../base/base.service";
import assertHiddenEntity from "./asserts/hidden-entity.assert";
import { HiddenStateGetAllDto } from "./dto/get-all-hidden-state.dto";
import { HiddenStateGetDto } from "./dto/get-hidden-state.dto";
import { HiddenStateHideDto } from "./dto/hide-hidden-state.dto";
import { HiddenStateEntity } from "./hidden-state.entity";

@Injectable()
export class HiddenStateService<
  Entity extends HiddenStateEntity,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
> extends BaseService<Entity, HiddenStateGetAllDto, HiddenStateGetDto, CreateDto, UpdateDto> {
  constructor(
    repository: Repository<Entity>,
    readonly entityName: string,
  ) {
    super(repository);
  }

  getHiddenStateModify = (
    queryBuilder: SelectQueryBuilder<Entity>,
    { searchHidden }: HiddenStateGetDto,
  ): SelectQueryBuilder<Entity> => {
    !searchHidden && queryBuilder.andWhere(`${this.entityName}.hiddenAt IS NULL`);

    return queryBuilder;
  };

  getAll = async (params: HiddenStateGetAllDto): Promise<Entity[]> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName);

    this.getBaseModify(queryBuilder, params);
    this.getBaseManyModify(queryBuilder, params);

    return this.getHiddenStateModify(queryBuilder, params).getMany();
  };

  getByParams = async (params: HiddenStateGetDto & Partial<Entity>): Promise<Entity> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(params);

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getHiddenStateModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  };

  getById = async (entityId: Entity["id"], params: HiddenStateGetDto): Promise<Entity> => {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId });

    this.getBaseModify(queryBuilder, params);

    const entity = await this.getHiddenStateModify(queryBuilder, params).getOne();

    assertFoundEntity(entity);

    return entity;
  };

  create = async (createDto: CreateDto): Promise<Entity> => {
    const toCreateEntity = this.repository.create(createDto);

    createDto.hiddenReason && (toCreateEntity.hiddenAt = new Date());

    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId: createdEntity.id })
      .getOne();
  };

  hide = async (entityId: Entity["id"], { hiddenReason }: HiddenStateHideDto) => {
    await this.getById(entityId, {});

    await this.repository
      .createQueryBuilder()
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ hiddenAt: new Date(), hiddenReason } as unknown as QueryDeepPartialEntity<Entity>)
      .where("id = :entityId", { entityId })
      .execute();

    return { message: "OK" };
  };

  show = async (entityId: Entity["id"]): Promise<Entity> => {
    const entity = await this.repository
      .createQueryBuilder(this.entityName)
      .withDeleted()
      .select([`${this.entityName}.hiddenAt`, `${this.entityName}.hiddenReason`])
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .getOne();

    assertFoundEntity(entity);
    assertHiddenEntity(entity);

    await this.repository
      .createQueryBuilder(this.entityName)
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ hiddenAt: null, hiddenReason: null } as QueryDeepPartialEntity<Entity>)
      .where(`${this.entityName}.id = :entityId`, { entityId })
      .execute();

    return this.getById(entityId, {});
  };
}
