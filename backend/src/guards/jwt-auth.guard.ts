import { AuthService } from "@database/auth/auth.service";
import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedException } from "src/exceptions/unauthorized.exception";

const PUBLIC_ROUTE_KEY = "public-route";

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);

// TODO: добавить зависимость от ролей
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

    const isPublicRoute = this.reflector.get<boolean>(PUBLIC_ROUTE_KEY, context.getHandler());

    if (isPublicRoute || method === "GET") {
      return true;
    }

    const [bearer, oldAccessToken] = headers.authorization?.split(" ") || [];

    if (!bearer) {
      return false;
    }

    const device = headers["user-agent"];
    const { accessToken } = await this.authService.validateSession({ accessToken: oldAccessToken, device });

    accessToken !== oldAccessToken && response.cookie("Authorization", `Bearer ${accessToken}`, { httpOnly: true });

    return true;
  };

  handleRequest(err: any, user: any, _: any, __: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
