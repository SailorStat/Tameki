import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetAllUserImageDto } from "./dto/get-all-user-image.dto";
import { UpdateUserImageDto } from "./dto/update-user-image.dto";
import { URL_USER_IMAGE_ID_PARAM, USER_IMAGE_BASE_URL } from "./user-image.constants";
import { UserImage } from "./user-image.entity";
import { UserImageService } from "./user-image.service";

@ApiTags("Изображения пользователей")
@Controller(USER_IMAGE_BASE_URL)
export class UserImageController {
  constructor(private userImageService: UserImageService) {}

  @ApiOperation({ description: "Получить список всех доступных изображений", summary: "Получить все изображения" })
  @ApiResponse({ description: "Успешный поиск изображений", status: HttpStatus.OK, type: [UserImage] })
  @Get()
  async getAll(@Query() getAllUserImageDto: GetAllUserImageDto) {
    const user = await this.userImageService.getAll(getAllUserImageDto);

    return user;
  }

  @ApiOperation({ description: "Получить изображение пользователя", summary: "Получить изображение пользователя" })
  @ApiResponse({ description: "Успешный поиск изображения пользователя", status: HttpStatus.OK, type: UserImage })
  @Get(`/:${URL_USER_IMAGE_ID_PARAM}`)
  async getById(@Param(URL_USER_IMAGE_ID_PARAM) userImageId: number) {
    const user = await this.userImageService.getById(userImageId);

    return user;
  }

  @ApiOperation({
    description: "Редактировать описание изображения пользователя",
    summary: "Редактировать описание изображения пользователя",
  })
  @ApiResponse({
    description: "Успешное редактирование описания изображения пользователя",
    status: HttpStatus.OK,
    type: UserImage,
  })
  @Patch(`/:${URL_USER_IMAGE_ID_PARAM}`)
  async update(@Param(URL_USER_IMAGE_ID_PARAM) userId: number, @Body() updateUserDto: UpdateUserImageDto) {
    const updatedUser = await this.userImageService.update(userId, updateUserDto);

    return updatedUser;
  }

  @ApiOperation({ description: "Удалить пользователя", summary: "Удалить изображение пользователя" })
  @ApiResponse({ description: "Успешное удаление изображения пользователя", status: HttpStatus.OK })
  @Delete(`/:${URL_USER_IMAGE_ID_PARAM}`)
  async delete(@Param(URL_USER_IMAGE_ID_PARAM) userId: number) {
    const user = await this.userImageService.delete(userId, {});

    return user;
  }
}
