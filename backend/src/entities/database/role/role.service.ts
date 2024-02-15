import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@utility/base/base.service";
import { assertFoundEntity } from "src/asserts/http.assert";
import { getWhereParams } from "src/utils/getWhereParams";
import { Repository } from "typeorm";

import { RoleCreateDto } from "./dto/create-role.dto";
import { RoleGetAllDto } from "./dto/get-all-role.dto";
import { RoleGetDto } from "./dto/get-role.dto";
import { RoleUpdateDto } from "./dto/update-role.dto";
import { RoleNames } from "./role.constants";
import { Role } from "./role.entity";

@Injectable()
export class RoleService extends BaseService<Role, RoleGetDto, RoleGetAllDto, RoleCreateDto, RoleUpdateDto> {
  entityName: string = "role";

  constructor(@InjectRepository(Role) protected readonly repository: Repository<Role>) {
    super(repository);
  }

  protected getWhereParams = (params: object): Partial<Role> => {
    const product = new Role();

    return getWhereParams(params, product);
  };

  async getByName(roleName: RoleNames): Promise<Role> {
    const queryBuilder = await this.repository
      .createQueryBuilder(this.entityName)
      .where("role.name = :roleName", { roleName });

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }
}
