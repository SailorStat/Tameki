import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FileService } from "../file/file.service";
import { SaveFileReturnType } from "../file/file.types";
import UpdateImageDto from "./dto/update-image.dto";
import { Image } from "./image.entity";

@Injectable()
export class ImageService extends FileService {
  FileBuilder = Image;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @InjectRepository(Image)
    protected readonly repository: Repository<Image>,
  ) {
    super(configService, repository);
  }

  protected declare createEntity: (file: Express.Multer.File) => Image;

  declare save: (file: Express.Multer.File, ...params: unknown[]) => SaveFileReturnType<Image>;

  declare getById: (id: number) => Promise<Image>;

  declare update: (id: number, updateImageDto: UpdateImageDto) => Promise<Image>;

  // Наследующие сервисы должны добавить метод для получения изображений по id связанной сущности
}
