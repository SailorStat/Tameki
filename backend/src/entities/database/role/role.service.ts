import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@utility/base/base.service";
import { assertFoundEntity } from "src/asserts/http.assert";
import { In, Repository } from "typeorm";

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

  async getAllByNames(roleNames: RoleNames[]): Promise<Role[]> {
    const roles = await this.repository.find({ where: { name: In(roleNames) } });

    assertFoundEntity(roles);

    return roles;
  }

  async getByName(roleName: RoleNames): Promise<Role> {
    const queryBuilder = await this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.name = :roleName`, { roleName });

    const entity = await queryBuilder.getOne();

    assertFoundEntity(entity);

    return entity;
  }
}
