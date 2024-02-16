import { UserCreateDto } from "@database/user/dto/create-user.dto";
import { LocalAuthGuard } from "@guards/LocalAuthGuard";
import { Body, Controller, HttpStatus, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    // const product = await this.authService.login(authLoginDto);

    return req.user;
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
