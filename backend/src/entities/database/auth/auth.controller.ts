import { UserCreateDto } from "@database/user/dto/create-user.dto";
import { Body, Controller, HttpStatus, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AUTH_BASE_URL } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/login-auth.dto";

@ApiTags("Авторизация")
@Controller(AUTH_BASE_URL)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: "Авторизация", summary: "Авторизация" })
  @ApiResponse({ description: "Успешная авторизация пользователя", status: HttpStatus.OK })
  @Post("/login")
  async login(@Body() authLoginDto: AuthLoginDto) {
    const user = await this.authService.login(authLoginDto);

    return user;
  }

  @ApiOperation({ description: "Создать пользователя", summary: "Создать пользователя" })
  @ApiResponse({ description: "Успешное создание пользователя", status: HttpStatus.OK })
  @UseInterceptors(FilesInterceptor("images"))
  @Post("/registration")
  async registration(@Body() createDto: UserCreateDto, @UploadedFiles() images = []) {
    const user = await this.authService.registration({ ...createDto, images });

    return user;
  }
}
