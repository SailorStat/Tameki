import assertSessionValidate from "@database/auth/asserts/assertSessionValidate";
import assertUserValidate from "@database/auth/asserts/assertUserValidate";
import { AuthService } from "@database/auth/auth.service";
import { UnauthorizedException } from "@exceptions/unauthorized.exception";
import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { toBearerToken } from "src/utils/toBearerToken";

import { MetadataKey } from "./metadataKey";

export const WithoutAuth = () => SetMetadata(MetadataKey.PublicRoute, true);

// TODO: добавить зависимость от id пользователя

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
    super();
  }

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const { headers, method } = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const isPublicRoute = this.reflector.get<boolean>(MetadataKey.PublicRoute, context.getHandler());

    if (isPublicRoute) {
      // || method === "GET") {
      return true;
    }

    const [bearer, oldAccessToken] = headers.authorization?.split(" ") || [];

    assertSessionValidate(bearer === "Bearer");

    const device = headers["user-agent"];
    const token = await this.authService.validateSession({ accessToken: oldAccessToken, device });

    token !== oldAccessToken && response.cookie("Authorization", toBearerToken(token), { httpOnly: true });

    return true;
  };

  handleRequest(err: any, user: any, _: any, __: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
