import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";

import { BaseService } from "../base/base.service";
import assertHiddenEntity from "./asserts/hidden-entity.assert";
import assertShowedEntity from "./asserts/showed-entity.assert";
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
    !searchHidden && queryBuilder.andWhere(`${this.entityName}.hiddenReason IS NULL`);

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
    const createdEntity = await this.repository.save(toCreateEntity);

    return this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :entityId`, { entityId: createdEntity.id })
      .getOne();
  };

  protected updateHiddenReason = async (
    entityId: Entity["id"],
    { hiddenReason }: HiddenStateHideDto,
  ): Promise<Entity> => {
    const entity = await this.getById(entityId, { searchHidden: !hiddenReason });

    assertFoundEntity(entity);
    hiddenReason ? assertShowedEntity(entity) : assertHiddenEntity(entity);

    const toSaveEntity = this.repository.create({ ...entity, hiddenReason });

    return this.repository.save(toSaveEntity);
  };

  hide = async (entityId: Entity["id"], { hiddenReason }: HiddenStateHideDto) => {
    await this.updateHiddenReason(entityId, { hiddenReason });

    return { message: "OK" };
  };

  show = async (entityId: Entity["id"]) => {
    return this.updateHiddenReason(entityId, { hiddenReason: null });
  };
}
