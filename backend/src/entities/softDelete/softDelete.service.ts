import { Injectable } from "@nestjs/common";
import { assertFoundEntity } from "src/asserts/http.assert";
import { Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.d";

import assertDeletedEntity from "./asserts/deletedEntity.assert";
import { SoftDeleteDeleteDto } from "./dto/softDelete.delete.dto";
import { SoftDeleteGetDto } from "./dto/softDelete.get.dto";
import { SoftDeleteGetAllDto } from "./dto/softDelete.getAll.dto";
import { SoftDeleteEntity } from "./softDelete.entity";

@Injectable()
export class SoftDeleteService<Entity extends SoftDeleteEntity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async getAll({ page, limit, searchDeleted }: SoftDeleteGetAllDto): Promise<Entity[]> {
    const queryBuilder = this.repository.createQueryBuilder("entity");

    if (searchDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getMany();
  }

  async getOne(entityId: number, { searchDeleted }: SoftDeleteGetDto): Promise<Entity> {
    const queryBuilder = this.repository.createQueryBuilder("entity").where("entity.id = :entityId", { entityId });

    if (searchDeleted) {
      queryBuilder.withDeleted();
    }

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }

  async delete(entityId: number, { deletionReason }: SoftDeleteDeleteDto) {
    await this.getOne(entityId, {});

    await this.repository
      .createQueryBuilder()
      .update()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .set({ deletedAt: new Date(), deletionReason } as unknown as QueryDeepPartialEntity<Entity>)
      .where("id = :entityId", { entityId })
      .execute();

    return { message: "OK" };
  }

  async restore(entityId: number): Promise<Entity> {
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

    const updatedEntity = await this.repository
      .createQueryBuilder("entity")
      .where("entity.id = :entityId", { entityId })
      .getOne();

    assertFoundEntity(updatedEntity);

    return updatedEntity;
  }
}
