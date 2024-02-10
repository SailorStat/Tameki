import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.d";

import { BaseEntity } from "../base/base.entity";
import { BaseService } from "../base/base.service";
import assertDeletedEntity from "./asserts/deleted-entity.assert";
import { SoftDeleteDeleteDto } from "./dto/delete-soft-delete.dto";
import { SoftDeleteGetAllDto } from "./dto/get-all-soft-delete.dto";
import { SoftDeleteGetDto } from "./dto/get-soft-delete.dto";

@Injectable()
export class SoftDeleteService<
  Entity extends BaseEntity,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
> extends BaseService<Entity, SoftDeleteGetAllDto, SoftDeleteGetDto, CreateDto, UpdateDto> {
  async getAll({ page, limit, searchDeleted }: SoftDeleteGetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("entity");

    searchDeleted && queryBuilder.withDeleted();

    return queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .orderBy("entity.id")
      .getMany();
  }

  async getByParams({ searchDeleted, ...params }: Partial<Entity & SoftDeleteGetDto>): Promise<Entity> {
    const queryBuilder = this.repository.createQueryBuilder("entity").where(params);

    if (searchDeleted) {
      queryBuilder.withDeleted();
    }

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async getById(entityId: Entity["id"], { searchDeleted }: SoftDeleteGetDto): Promise<Entity> {
    const queryBuilder = this.repository.createQueryBuilder("entity").where("entity.id = :entityId", { entityId });

    if (searchDeleted) {
      queryBuilder.withDeleted();
    }

    const entity = await queryBuilder.getOne();

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
      .createQueryBuilder("entity")
      .withDeleted()
      .addSelect(["entity.deletedAt", "entity.deletionReason"])
      .where("entity.id = :entityId", { entityId })
      .getOne();

    assertFoundEntity(entity);
    assertDeletedEntity(entity);

    await this.repository
      .createQueryBuilder("entity")
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ deletedAt: null, deletionReason: null } as unknown as QueryDeepPartialEntity<Entity>)
      .where("entity.id = :entityId", { entityId })
      .execute();

    const updatedEntity = await this.getById(entityId, {});

    assertFoundEntity(updatedEntity);

    return updatedEntity;
  }
}
