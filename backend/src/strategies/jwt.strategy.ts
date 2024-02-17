import { AuthService } from "@database/auth/auth.service";
import { AuthLoginDto } from "@database/auth/dto/login-auth.dto";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(authLoginDto: AuthLoginDto) {
    return this.authService.validateUser(authLoginDto);
  }
}
