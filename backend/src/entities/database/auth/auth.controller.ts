import { PublicRoute } from "@guards/jwt-auth.guard";
import { Body, Controller, HttpStatus, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AUTH_BASE_URL } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/login-auth.dto";
import { AuthRegistrationDto } from "./dto/registration-auth.dto";

@ApiTags("Авторизация")
@Controller(AUTH_BASE_URL)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: "Авторизация", summary: "Авторизация" })
  @ApiResponse({ description: "Успешная авторизация пользователя", status: HttpStatus.OK })
  @PublicRoute()
  @Post("/login")
  async login(@Body() authLoginDto: AuthLoginDto, @Req() request: Request) {
    const user = await this.authService.login({ ...authLoginDto, device: request.headers["user-agent"] });

    return user;
  }

  @ApiOperation({ description: "Создать пользователя", summary: "Создать пользователя" })
  @ApiResponse({ description: "Успешное создание пользователя", status: HttpStatus.OK })
  @UseInterceptors(FilesInterceptor("images"))
  @PublicRoute()
  @Post("/registration")
  async registration(@Body() authRegistrationDto: AuthRegistrationDto, @UploadedFiles() images = []) {
    const user = await this.authService.registration({ ...authRegistrationDto, images });

    return user;
  }
}
