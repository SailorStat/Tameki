import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveFileReturnType } from "@utility/file/file.types";
import { ImageService } from "@utility/image/image.service";
import { Repository } from "typeorm";

import GetAllUserImageDto from "./dto/get-all-user-image.dto";
import UpdateUserImageDto from "./dto/update-user-image.dto";
import { UserImage } from "./user-image.entity";

@Injectable()
export class UserImageService extends ImageService {
  readonly entityName: string = "user_image";

  FileBuilder = UserImage;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @InjectRepository(UserImage) protected readonly repository: Repository<UserImage>,
  ) {
    super(configService, repository);
  }

  protected declare createEntity: (file: Express.Multer.File) => UserImage;

  save = async (file: Express.Multer.File, userId: number): SaveFileReturnType<UserImage> => {
    const uploadsPath = this.configService.get("UPLOADS_PATH");
    const fileEntity = this.createEntity(file);
    const filePath = `${uploadsPath}/${fileEntity.url}`;

    fileEntity.userId = userId;

    try {
      await this.writeWithRetry(filePath, file);
    } catch (error) {
      return { errorMessage: error.message };
    }

    return this.repository.save(fileEntity);
  };

  declare getAll: (getAllUserImageDto: GetAllUserImageDto) => Promise<UserImage[]>;

  declare getById: (userImageId: number) => Promise<UserImage>;

  declare update: (userImageId: number, updateImageDto: UpdateUserImageDto) => Promise<UserImage>;
}
