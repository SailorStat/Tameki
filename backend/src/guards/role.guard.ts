import { AuthService } from "@database/auth/auth.service";
import { RoleNames } from "@database/role/role.constants";
import { ForbiddenException } from "@exceptions/forbidden.exception";
import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

import { MetadataKey } from "./metadataKey";

export interface RoleOptions {
  requireEvery?: boolean;
  roleNames: RoleNames[];
}

export const Roles = (options: RoleOptions) => SetMetadata(MetadataKey.Role, options);

@Injectable()
export class RoleGuard extends AuthGuard("jwt") {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
    super();
  }

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const { headers } = context.switchToHttp().getRequest();
    const roleOptions = this.reflector.get<RoleOptions>(MetadataKey.Role, context.getHandler());

    if (!roleOptions) {
      return true;
    }

    const [bearer, accessToken] = headers.authorization?.split(" ") || [];

    if (bearer !== "Bearer") {
      return false;
    }

    return this.authService.validateRole({ accessToken, ...roleOptions });
  };

  handleRequest(err: any, user: any, _: any, __: ExecutionContext) {
    if (err || !user) {
      throw err || new ForbiddenException();
    }

    return user;
  }
}
