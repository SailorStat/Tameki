import { UserService } from "@database/user/user.service";
import { RoleOptions } from "@guards/role.guard";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcryptjs from "bcryptjs";
import { isDateWithinDays } from "src/utils/isDateWithinDays";
import { Repository } from "typeorm";

import assertSessionValidate from "./asserts/assertSessionValidate";
import assertUserCandidate from "./asserts/assertUserCandidate";
import assertUserRoles from "./asserts/assertUserRoles";
import assertUserValidate from "./asserts/assertUserValidate";
import { Auth } from "./auth.entity";
import { AuthGenerateTokenDto } from "./dto/generate-token-auth.dto";
import { AuthLoginDto } from "./dto/login-auth.dto";
import { AuthRegistrationDto } from "./dto/registration-auth.dto";
import { AuthValidateSessionDto } from "./dto/validate-session-auth.dto";

@Injectable()
export class AuthService {
  entityName = "auth";

  constructor(
    protected readonly jwtService: JwtService,
    @Inject(UserService) protected readonly userService: UserService,
    @InjectRepository(Auth) protected readonly authRepository: Repository<Auth>,
  ) {}

  protected generateToken = async (params: AuthGenerateTokenDto): Promise<string> => {
    const authSession = this.authRepository.create(params);
    const savedAuthSession = await this.authRepository.save(authSession);

    return savedAuthSession.accessToken;
  };

  protected getUserSessionByAccessToken = async (accessToken: string, options?: { searchRoles?: boolean }) => {
    const queryBuilder = this.authRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.user`, this.userService.entityName);

    options?.searchRoles && queryBuilder.leftJoinAndSelect(`${this.userService.entityName}.roles`, "role");

    const authSession = queryBuilder.where(`${this.entityName}.accessToken = :accessToken`, { accessToken }).getOne();

    assertSessionValidate(!!authSession);

    return authSession;
  };

  validateSession = async (authSessionDto: AuthValidateSessionDto): Promise<string> => {
    const authSession = await this.getUserSessionByAccessToken(authSessionDto.accessToken);

    assertSessionValidate(isDateWithinDays(authSession.createdAt, 7));

    if (!isDateWithinDays(authSession.createdAt, 1)) {
      return this.generateToken({
        device: authSessionDto.device,
        previousRefreshToken: authSession.refreshToken,
        user: authSession.user,
      });
    }

    return authSessionDto.accessToken;
  };

  validateUser = async (authLoginDto: AuthLoginDto) => {
    const user = await this.userService.getByParams({ email: authLoginDto.email, selectPassword: true });
    const passwordValid = await bcryptjs.compare(authLoginDto.password, user.password);

    assertUserValidate(passwordValid);

    user.password = undefined;

    return user;
  };

  validateRole = async ({ accessToken, roleNames, requireEvery }: RoleOptions & { accessToken: string }) => {
    const authSession = await this.getUserSessionByAccessToken(accessToken, { searchRoles: true });

    assertUserValidate(!!authSession?.user);

    const userRoles = authSession.user.roles;

    if (!authSession?.user.roles) {
      return false;
    }

    const userRoleNames = userRoles.map((userRole) => userRole.name);
    const validRoles = await roleNames[requireEvery ? "every" : "some"]((roleName) => userRoleNames.includes(roleName));

    assertUserRoles(validRoles);

    return validRoles;
  };

  login = async (authLoginDto: AuthLoginDto) => {
    const user = await this.validateUser(authLoginDto);
    const token = await this.generateToken({ device: authLoginDto.device, user });

    return { token, user };
  };

  registration = async (authRegistrationDto: AuthRegistrationDto) => {
    const foundUser = await this.userService.getByParams({ email: authRegistrationDto.email, withNotFound: true });

    assertUserCandidate(foundUser);

    const hashPassword = await bcryptjs.hash(authRegistrationDto.password, 5);
    const user = await this.userService.create({ ...authRegistrationDto, password: hashPassword });
    const token = await this.generateToken({ device: authRegistrationDto.device, user });

    return { token, user };
  };
}
