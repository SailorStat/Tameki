import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RoleCreateDto } from "./dto/create-role.dto";
import { RoleGetByNameDto } from "./dto/get--by-name-role.dto";
import { RoleGetAllDto } from "./dto/get-all-role.dto";
import { RoleGetDto } from "./dto/get-role.dto";
import { RoleUpdateDto } from "./dto/update-role.dto";
import { ROLE_BASE_URL, URL_ROLE_ID_PARAM } from "./role.constants";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";

@ApiTags("Роли")
@Controller(ROLE_BASE_URL)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ description: "Получить список всех доступных ролей", summary: "Получить все роли" })
  @ApiResponse({ description: "Успешный поиск ролей", status: HttpStatus.OK, type: [Role] })
  @Get()
  async getAll(@Query() getAllDto: RoleGetAllDto) {
    const role = await this.roleService.getAll(getAllDto);

    return role;
  }

  @ApiOperation({ description: "Создать роль", summary: "Создать роль" })
  @ApiResponse({ description: "Успешное создание роли", status: HttpStatus.CREATED, type: Role })
  @Post()
  async create(@Body() createDto: RoleCreateDto) {
    const role = await this.roleService.create(createDto);

    return role;
  }

  @ApiOperation({ description: "Получить роль по названию", summary: "Получить роль по названию" })
  @ApiResponse({ description: "Успешный поиск роли по названию", status: HttpStatus.OK, type: Role })
  @Get("/role")
  async getByName(@Query() { name }: RoleGetByNameDto) {
    const user = await this.roleService.getByName(name);

    return user;
  }

  @ApiOperation({ description: "Получить роль", summary: "Получить роль" })
  @ApiResponse({ description: "Успешный поиск ролей", status: HttpStatus.OK, type: Role })
  @Get(`/:${URL_ROLE_ID_PARAM}`)
  async getById(@Param(URL_ROLE_ID_PARAM) roleId: number, @Query() getDto: RoleGetDto) {
    const role = await this.roleService.getById(roleId, getDto);

    return role;
  }

  @ApiOperation({ description: "Редактировать роль", summary: "Редактировать роль" })
  @ApiResponse({ description: "Успешное редактирование роли", status: HttpStatus.OK, type: Role })
  @Patch(`/:${URL_ROLE_ID_PARAM}`)
  async update(@Param(URL_ROLE_ID_PARAM) roleId: number, @Body() updateDto: RoleUpdateDto) {
    const updatedRole = await this.roleService.update(roleId, updateDto);

    return updatedRole;
  }

  @ApiOperation({ description: "Удалить роль", summary: "Удалить роль" })
  @ApiResponse({ description: "Успешное удаление роли", status: HttpStatus.OK, type: Role })
  @Delete(`/:${URL_ROLE_ID_PARAM}`)
  async delete(@Param(URL_ROLE_ID_PARAM) roleId: number) {
    const deletedResult = await this.roleService.delete(roleId, {});

    return deletedResult;
  }
}
