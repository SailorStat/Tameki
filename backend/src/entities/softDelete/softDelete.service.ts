import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";

import { SoftDeleteDeleteDto } from "./dto/softDelete.delete.dto";
import { SoftDeleteGetDto } from "./dto/softDelete.get.dto";
import { SoftDeleteGetAllDto } from "./dto/softDelete.getAll.dto";
import { SoftDeleteEntity } from "./softDelete.entity";

@Injectable()
export class SoftDeleteService<Entity extends SoftDeleteEntity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async getAll({ page, limit, searchDeleted }: SoftDeleteGetAllDto): Promise<Entity[]> {
    const findOptions: FindManyOptions<Entity> = {
      skip: (page - 1) * limit,
      take: limit,
      where: {},
    };

    if (!searchDeleted) {
      findOptions.where = { deletionReason: null };
    }

    return this.repository.find(findOptions);
  }

  async getOne(id: number, { searchDeleted }: SoftDeleteGetDto): Promise<Entity> {
    const findOptions: FindOneOptions<Entity> = { where: {} };

    if (!searchDeleted) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore adsfas
      findOptions.where.deletionReason = null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore adsfas
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number, { deletionReason }: SoftDeleteDeleteDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore adsfas
    const entity = await this.repository.findOne(id);

    if (!entity) {
      throw new HttpException("Сущность не найдена", HttpStatus.BAD_REQUEST);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore adsfas
    await this.repository.update(id, { deleteAt: new Date(), deletionReason });

    return { message: "OK" };
  }

  async restore(id: number): Promise<Entity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore adsfas
    const entity = await this.repository.findOne(id);

    if (!entity) {
      throw new HttpException("Сущность не найдена", HttpStatus.BAD_REQUEST);
    }

    if (!entity.deletedAt || !entity.deletionReason) {
      throw new HttpException("Запись не была удалена или отсутствует причина удаления", HttpStatus.BAD_REQUEST);
    }

    entity.deletionReason = null;
    entity.deletedAt = null;

    return this.repository.save(entity);
  }
}
