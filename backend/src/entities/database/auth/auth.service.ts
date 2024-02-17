import { UserCreateDto } from "@database/user/dto/create-user.dto";
import { User } from "@database/user/user.entity";
import { UserService } from "@database/user/user.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";

import assertUserCandidate from "./asserts/assertUserCandidate";
import assertUserValidate from "./asserts/assertUserValidate";
import { AuthLoginDto } from "./dto/login-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
  ) {}

  protected generateToken = ({ email, password, roles }: User) => ({
    token: this.jwtService.sign({ email, password, roles }),
  });

  protected validateUser = async (authLoginDto: AuthLoginDto) => {
    const user = await this.userService.getByParams({ email: authLoginDto.email, selectPassword: true });

    const passwordValid = await bcryptjs.compare(authLoginDto.password, user.password);

    assertUserValidate(passwordValid);

    return user;
  };

  login = async (authLoginDto: AuthLoginDto) => {
    const user = await this.validateUser(authLoginDto);

    return this.generateToken(user);
  };

  registration = async (userDto: UserCreateDto) => {
    const foundUser = await this.userService.getByParams({ email: userDto.email, withNotFound: true });

    assertUserCandidate(foundUser);

    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.userService.create({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  };
}
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4xMjEzNEBleGFtcGxlLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wMi0xNlQxNDoyMjozMS44MDZaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0xNlQxNDoyMjozMS44MDZaIiwibmFtZSI6ImFkbWluIiwiZGVzY3JpcHRpb24iOiLQn9C-0LvQvdGL0Lkg0LTQvtGB0YLRg9C_INC6INCx0LDQt9C1INC00LDQvdC90YvRhSJ9LHsiaWQiOjIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMTZUMTQ6MjI6NTIuODA2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMTZUMTQ6MjI6NTIuODA2WiIsIm5hbWUiOiJ1c2VyIiwiZGVzY3JpcHRpb24iOiLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0L3QvdGL0Lkg0L_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIn1dLCJpYXQiOjE3MDgwOTcwMzgsImV4cCI6MTcwODE4MzQzOH0.BhePdoLZO5ovE03D0x4VHHtEI9TRlskKz96rTjIykfs"
