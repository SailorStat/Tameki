import { PublicRoute } from "@guards/jwt-auth.guard";
import { Body, Controller, HttpStatus, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

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
  async login(
    @Body() authLoginDto: AuthLoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.login({ ...authLoginDto, device: request.headers["user-agent"] });

    response.cookie("Authorization", `Bearer ${token}`, { httpOnly: true });

    return user;
  }

  @ApiOperation({ description: "Создать пользователя", summary: "Создать пользователя" })
  @ApiResponse({ description: "Успешное создание пользователя", status: HttpStatus.OK })
  @UseInterceptors(FilesInterceptor("images"))
  @PublicRoute()
  @Post("/registration")
  async registration(
    @Body() authRegistrationDto: AuthRegistrationDto,
    @UploadedFiles() images = [],
    @Req() request: Request,
    @Res({ passthrough: true }) response,
  ) {
    const { token, user } = await this.authService.registration({
      ...authRegistrationDto,
      device: request.headers["user-agent"],
      images,
    });

    response.cookie("Authorization", `Bearer ${token}`, { httpOnly: true });

    return user;
  }
}
