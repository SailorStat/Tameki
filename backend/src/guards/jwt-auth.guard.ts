import assertSessionValidate from "@database/auth/asserts/assertSessionValidate";
import { AuthService } from "@database/auth/auth.service";
import { UnauthorizedException } from "@exceptions/unauthorized.exception";
import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { toBearerToken } from "src/utils/toBearerToken";

import { MetadataKey } from "./metadataKey";

export const WithoutAuth = () => SetMetadata(MetadataKey.PublicRoute, true);

export const AddUserId = () => SetMetadata(MetadataKey.AddUserId, true);

export interface RequestWithUserId extends Request {
  userId: number;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
    super();
  }

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const { headers, method } = request;
    const response = context.switchToHttp().getResponse();
    const isPublicRoute = this.reflector.get<boolean>(MetadataKey.PublicRoute, context.getHandler());
    const needAddUserId = this.reflector.get<boolean>(MetadataKey.AddUserId, context.getHandler());

    if (!needAddUserId && (isPublicRoute || method === "GET")) {
      return true;
    }

    const [bearer, oldAccessToken] = headers.authorization?.split(" ") || [];

    assertSessionValidate(bearer === "Bearer");

    const device = headers["user-agent"];
    const { accessToken, user } = await this.authService.validateSession({ accessToken: oldAccessToken, device });

    needAddUserId && (request.userId = user.id);
    accessToken !== oldAccessToken && response.cookie("Authorization", toBearerToken(accessToken), { httpOnly: true });

    return true;
  };

  handleRequest(err: any, user: any, _: any, __: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
