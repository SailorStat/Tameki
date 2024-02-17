import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(protected readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const [bearer, token] = authHeader.split(" ");

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "Пользователь не авторизован" });
      }

      const user = this.jwtService.verify(token);

      request.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "Пользователь не авторизован" });
    }
  }
}
