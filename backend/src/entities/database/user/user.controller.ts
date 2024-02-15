import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlockedStateBlockDto } from "@utility/blocked-state/dto/block-blocked-state.dto";
import { SoftDeleteDeleteDto } from "@utility/soft-delete/dto/delete-soft-delete.dto";

import { UserCreateDto } from "./dto/create-user.dto";
import { UserGetAllDto } from "./dto/get-all-user.dto";
import { UserGetByParamsDto } from "./dto/get-by-params-user.dto";
import { UserGetDto } from "./dto/get-user.dto";
import { UserUpdateDto } from "./dto/update-user.dto";
import { URL_USER_ID_PARAM, USER_BASE_URL } from "./user.constants";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("Пользователи")
@Controller(USER_BASE_URL)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ description: "Получить список всех доступных пользователей", summary: "Получить всех пользователей" })
  @ApiResponse({ description: "Успешный поиск пользователей", status: HttpStatus.OK, type: [User] })
  @Get()
  async getAll(@Query() getAllDto: UserGetAllDto) {
    const user = await this.userService.getAll(getAllDto);

    return user;
  }

  @ApiOperation({ description: "Создать пользователя", summary: "Создать пользователя" })
  @ApiResponse({ description: "Успешное создание пользователя", status: HttpStatus.CREATED, type: User })
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(@Body() createDto: UserCreateDto, @UploadedFiles() images) {
    const user = await this.userService.create({ ...createDto, images });

    return user;
  }

  @ApiOperation({ description: "Получить пользователя", summary: "Получить пользователя" })
  @ApiResponse({ description: "Успешный поиск пользователей", status: HttpStatus.OK, type: User })
  @Get("/user")
  async getByParams(@Query() getByParamsDto: UserGetByParamsDto) {
    const user = await this.userService.getByParams(getByParamsDto);

    return user;
  }

  @ApiOperation({ description: "Получить пользователя", summary: "Получить пользователя" })
  @ApiResponse({ description: "Успешный поиск пользователей", status: HttpStatus.OK, type: User })
  @Get(`/:${URL_USER_ID_PARAM}`)
  async getById(@Param(URL_USER_ID_PARAM) userId: number, @Query() getDto: UserGetDto) {
    const user = await this.userService.getById(userId, getDto);

    return user;
  }

  @ApiOperation({ description: "Редактировать пользователя", summary: "Редактировать пользователя" })
  @ApiResponse({ description: "Успешное редактирование пользователя", status: HttpStatus.OK, type: User })
  @Patch(`/:${URL_USER_ID_PARAM}`)
  async update(@Param(URL_USER_ID_PARAM) userId: number, @Body() updateDto: UserUpdateDto) {
    const updatedUser = await this.userService.update(userId, updateDto);

    return updatedUser;
  }

  @ApiOperation({ description: "Удалить пользователя", summary: "Удалить пользователя" })
  @ApiResponse({ description: "Успешное удаление пользователя", status: HttpStatus.OK })
  @Delete(`/:${URL_USER_ID_PARAM}`)
  async delete(@Param(URL_USER_ID_PARAM) userId: number, @Body() deleteDto: SoftDeleteDeleteDto) {
    const user = await this.userService.delete(userId, deleteDto);

    return user;
  }

  @ApiOperation({ description: "Восстановить пользователя после удаления", summary: "Восстановить пользователя" })
  @ApiResponse({ description: "Успешное восстановление пользователя", status: HttpStatus.OK })
  @Patch(`/:${URL_USER_ID_PARAM}/restore`)
  async restore(@Param(URL_USER_ID_PARAM) userId: number) {
    const user = await this.userService.restore(userId);

    return user;
  }

  @ApiOperation({ description: "Заблокировать пользователя", summary: "Заблокировать пользователя" })
  @ApiResponse({ description: "Пользователь заблокирован", status: HttpStatus.OK })
  @Patch(`/:${URL_USER_ID_PARAM}/block`)
  async block(@Param(URL_USER_ID_PARAM) userId: number, @Body() blockDto: BlockedStateBlockDto) {
    const user = await this.userService.block(userId, blockDto);

    return user;
  }

  @ApiOperation({ description: "Разблокировать пользователя после блокировки", summary: "Разблокировать пользователя" })
  @ApiResponse({ description: "Успешная разблокировка пользователя", status: HttpStatus.OK })
  @Patch(`/:${URL_USER_ID_PARAM}/unblock`)
  async unblock(@Param(URL_USER_ID_PARAM) userId: number) {
    const user = await this.userService.unblock(userId);

    return user;
  }
}
