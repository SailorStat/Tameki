import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UnauthorizedException } from "src/exceptions/unauthorized.exception";

const PUBLIC_ROUTE_KEY = "public-route";

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);

// TODO: добавить зависимость от ролей
// TODO: добавить зависимость от id пользователя

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(protected readonly reflector: Reflector) {
    super({ passwordField: "password", usernameField: "email" });
  }

  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublicRoute = this.reflector.get<boolean>(PUBLIC_ROUTE_KEY, context.getHandler());

    if (isPublicRoute) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    if (request.method === "GET") {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _: any, __: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
