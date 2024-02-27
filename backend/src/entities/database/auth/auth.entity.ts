import { User } from "@database/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "@utility/base/base.entity";
import { randomBytes } from "crypto";
import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Auth extends BaseEntity {
  @ApiProperty({ description: "Сгенерированный токен доступа", readOnly: true })
  @Column({ unique: true })
  accessToken: string;

  @ApiProperty({ description: "Сгенерированный refresh токен", readOnly: true })
  @Column({ unique: true })
  refreshToken: string;

  @ApiProperty({ description: "Прошлый сгенерированный refresh токен", readOnly: true })
  @Column({ nullable: true })
  previousRefreshToken?: string;

  @ApiProperty({ description: "Устройство, с которого была выполнена авторизация", readOnly: true })
  @Column()
  device: string;

  @ApiProperty({ description: "Авторизованный пользователь", type: () => User })
  @ManyToOne(() => User, (user) => user.authorizations)
  user: User;

  @BeforeInsert()
  generateTokens() {
    this.accessToken = this.generateRandomToken();
    this.refreshToken = this.generateRandomToken();
  }

  private generateRandomToken(): string {
    return randomBytes(32).toString("hex");
  }
}
