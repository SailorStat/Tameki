import { UserService } from "@database/user/user.service";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcryptjs from "bcryptjs";
import { isDateWithinDays } from "src/utils/isDateWithinDays";
import { Repository } from "typeorm";

import assertSessionValidate from "./asserts/assertSessionValidate";
import assertUserCandidate from "./asserts/assertUserCandidate";
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

  protected generateToken = async (params: AuthGenerateTokenDto): Promise<{ accessToken: string }> => {
    const authSession = this.authRepository.create(params);
    const savedAuthSession = await this.authRepository.save(authSession);

    return { accessToken: savedAuthSession.accessToken };
  };

  validateSession = async (authSessionDto: AuthValidateSessionDto): Promise<{ accessToken: string }> => {
    const authSession = await this.authRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.user`, this.userService.entityName)
      .where(`${this.entityName}.accessToken = :accessToken`, { accessToken: authSessionDto.accessToken })
      .getOne();

    assertSessionValidate(!!authSession);
    assertSessionValidate(isDateWithinDays(authSession.createdAt, 7));

    if (!isDateWithinDays(authSession.createdAt, 1)) {
      return this.generateToken({
        device: authSessionDto.device,
        previousRefreshToken: authSession.refreshToken,
        user: authSession.user,
      });
    }

    return authSessionDto;
  };

  validateUser = async (authLoginDto: AuthLoginDto) => {
    const user = await this.userService.getByParams({ email: authLoginDto.email, selectPassword: true });
    const passwordValid = await bcryptjs.compare(authLoginDto.password, user.password);

    assertUserValidate(passwordValid);

    return user;
  };

  login = async (authLoginDto: AuthLoginDto) => {
    const user = await this.validateUser(authLoginDto);

    return this.generateToken({ device: authLoginDto.device, user });
  };

  registration = async (authRegistrationDto: AuthRegistrationDto) => {
    const foundUser = await this.userService.getByParams({ email: authRegistrationDto.email, withNotFound: true });

    assertUserCandidate(foundUser);

    const hashPassword = await bcryptjs.hash(authRegistrationDto.password, 5);
    const user = await this.userService.create({ ...authRegistrationDto, password: hashPassword });

    return this.generateToken({ device: authRegistrationDto.device, user });
  };
}
