import { IsEmail, IsString, Length } from "@constraints";
import { Auth } from "@database/auth/auth.entity";
import { Review } from "@database/review/review.entity";
import { ReviewVoteState } from "@database/review-vote-state/review-vote-state.entity";
import { Role } from "@database/role/role.entity";
import { UserImage } from "@database/user-image/user-image.entity";
import { ApiProperty } from "@nestjs/swagger";
import { SoftDeleteEntity } from "@utility/soft-delete/soft-delete.entity";
import { IsOptional } from "class-validator";
import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class User extends SoftDeleteEntity {
  // Взято из BlockedState. Здесь отдельные изменения не вносить
  @ApiProperty({ description: "Дата блокировки", example: "Mon, 05 Feb 2024 12:23:37 GMT" })
  @Column({ nullable: true, select: false, type: "timestamp" })
  blockedAt: Date;

  @ApiProperty({ description: "Причина блокировки", example: "Множественные оскорбления" })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, select: false, type: "varchar" })
  blockedReason?: string;

  @BeforeUpdate()
  updateBlockedAt() {
    this.blockedAt = !this.blockedReason ? null : new Date();
  }
  // -------------------------------------------------

  @ApiProperty({ description: "Список авторизаций пользователя" })
  @OneToMany(() => Auth, (auth) => auth.user)
  authorizations: Auth[];

  @ApiProperty({ description: "Имя пользователя", example: "John" })
  @IsString()
  @Length(1, 50)
  @Column()
  firstname: string;

  @ApiProperty({ description: "Фамилия пользователя", example: "Doe" })
  @IsString()
  @Length(1, 50)
  @Column()
  lastname: string;

  @ApiProperty({ description: "Email пользователя", example: "john@example.com" })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: "Пароль пользователя", example: "john@example.com" })
  @IsString()
  @Column({ select: false })
  password: string;

  @ApiProperty({ description: "Описание пользователя", example: "Опытный разработчик" })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  about?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Язык локализации пользователя", example: "ru" })
  localization?: string;

  @ApiProperty({ description: "Ник пользователя", example: "john_doe" })
  @IsOptional()
  @IsString()
  @Column({ nullable: true, unique: true })
  nickname?: string;

  @ApiProperty({ description: "ID пользователя в VK", example: "123456789" })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  vkUserId?: string;

  @ApiProperty({ description: "ID пользователя в Telegram", example: "123456789" })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  telegramUserId?: string;

  @ApiProperty({ description: "ID пользователя в Google", example: "123456789" })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  googleUserId?: string;

  @ApiProperty({ description: "Изображения товара", isArray: true, type: () => UserImage })
  @OneToMany(() => UserImage, (image) => image.user)
  images: UserImage[];

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: "user_roles" })
  roles: Role[];

  @ApiProperty({ description: "Отзывы пользователя", type: () => [Review] })
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ApiProperty({ description: "Состояния оценки отзывов", type: () => [ReviewVoteState] })
  @OneToMany(() => ReviewVoteState, (vote) => vote.user)
  reviewVotes: ReviewVoteState[];

  // TODO: Добавить поле для списка покупок
}
