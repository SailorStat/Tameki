import { Role } from "@database/role/role.entity";
import { UserImageService } from "@database/user-image/user-image.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@utility/base/base.service";
import { BlockedStateService } from "@utility/blocked-state/blocked-state.service";
import { BlockedStateBlockDto } from "@utility/blocked-state/dto/block-blocked-state.dto";
import { SoftDeleteDeleteDto } from "@utility/soft-delete/dto/delete-soft-delete.dto";
import { SoftDeleteService } from "@utility/soft-delete/soft-delete.service";
import { assertFoundEntity } from "src/asserts/http.assert";
import { getWhereParams } from "src/utils/getWhereParams";
import { In, Repository, SelectQueryBuilder } from "typeorm";

import { UserCreateDto } from "./dto/create-user.dto";
import { UserGetAllDto } from "./dto/get-all-user.dto";
import { UserGetDto } from "./dto/get-user.dto";
import { UserUpdateDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService extends BaseService<User, UserGetDto, UserGetAllDto, UserCreateDto, UserUpdateDto> {
  readonly entityName: string = "user";

  softDeleteService: SoftDeleteService<User>;

  blockedStateService: BlockedStateService<User>;

  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
    protected readonly userImageService: UserImageService,
    @InjectRepository(Role) protected readonly roleRepository: Repository<Role>,
  ) {
    super(repository);
    this.softDeleteService = new SoftDeleteService(repository, this.entityName);
    this.blockedStateService = new BlockedStateService(repository, this.entityName);
  }

  protected getUserModify = (queryBuilder: SelectQueryBuilder<User>, _?: UserGetDto): SelectQueryBuilder<User> =>
    queryBuilder.leftJoinAndSelect(`${this.entityName}.images`, "images");
  // .leftJoinAndSelect(`${this.entityName}.roles`, "roles");
  // .addSelect(["roles.name"]);

  protected getWhereParams = (params: object): Partial<User> => {
    const user = new User();

    delete user.images;
    delete user.roles;

    return getWhereParams(params, user);
  };

  getAll = async (getAllUsersDto: UserGetAllDto): Promise<User[]> => {
    const { limit = 20, page = 1 } = getAllUsersDto;

    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getAllUsersDto));

    this.getBaseModify(queryBuilder, getAllUsersDto);
    this.getUserModify(queryBuilder, getAllUsersDto);
    this.getBaseManyModify(queryBuilder, { ...getAllUsersDto, limit, page });
    this.blockedStateService.getBlockedStateModify(queryBuilder, getAllUsersDto);

    return this.softDeleteService.getSoftDeleteModify(queryBuilder, getAllUsersDto).getMany();
  };

  getByParams = async (getByParamsDto: Partial<User & UserGetDto>): Promise<User> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getByParamsDto));

    this.getUserModify(queryBuilder);
    this.getBaseModify(queryBuilder, getByParamsDto);
    this.blockedStateService.getBlockedStateModify(queryBuilder, getByParamsDto);

    const user = await this.softDeleteService.getSoftDeleteModify(queryBuilder, getByParamsDto).getOne();

    assertFoundEntity(user);

    return user;
  };

  getById = async (userId: number, getUserDto: UserGetDto): Promise<User> => {
    console.log(userId);

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :userId`, { userId });

    this.getUserModify(queryBuilder);
    this.getBaseModify(queryBuilder, getUserDto);
    this.blockedStateService.getBlockedStateModify(queryBuilder, getUserDto);

    const user = await this.softDeleteService.getSoftDeleteModify(queryBuilder, getUserDto).getOne();

    assertFoundEntity(user);

    return user;
  };

  create = async ({ images, roleNames, ...createDto }: UserCreateDto) => {
    const user = this.repository.create(createDto);

    const roles = await this.roleRepository.find({ where: { name: In(roleNames) } });

    user.roles = roles;

    const createdUser = await this.repository.save(user);

    await Promise.allSettled(
      images.map(async (image) => {
        await this.userImageService.save(image, createdUser.id);
      }),
    );

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :userId`, { userId: createdUser.id });

    return this.getUserModify(queryBuilder).getOne();
  };

  delete = async (userId: number, deletableDto: SoftDeleteDeleteDto) => {
    return this.softDeleteService.delete(userId, deletableDto);
  };

  restore = async (userId: number) => {
    return this.softDeleteService.restore(userId);
  };

  block = async (userId: number, blockDto: BlockedStateBlockDto) => {
    return this.blockedStateService.block(userId, blockDto);
  };

  unblock = async (userId: number) => {
    return this.blockedStateService.unblock(userId);
  };
}
