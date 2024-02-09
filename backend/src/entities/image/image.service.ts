import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseGetAllDto } from "src/entities/base/dto/get-all-base.dto";
import { SoftDeleteDeleteDto } from "src/entities/softDelete/dto/delete-soft-delete.dto";
import { SoftDeleteGetDto } from "src/entities/softDelete/dto/get-soft-delete.dto";
import { SoftDeleteService } from "src/entities/softDelete/softDelete.service";
import { Repository } from "typeorm";

import { BaseService } from "../base/base.service";
import CreateImageDto from "./dto/create-image.dto";
import UpdateImageDto from "./dto/update-image.dto";
import { Image } from "./image.entity";

type ImageId = Image["id"];

@Injectable()
export class ImageService extends BaseService<Image, BaseGetAllDto, SoftDeleteGetDto, CreateImageDto, UpdateImageDto> {
  softDeleteService: SoftDeleteService<Image>;

  constructor(
    @InjectRepository(Image)
    protected readonly repository: Repository<Image>,
  ) {
    super(repository);
    this.softDeleteService = new SoftDeleteService(repository);
  }

  getAll = async (softDeleteGetAllDto: BaseGetAllDto): Promise<Image[]> => {
    const { page = 1, limit = 40, ...params } = softDeleteGetAllDto;

    return this.softDeleteService.getAll({ limit, page, ...params });
  };

  getByParams = async (getImageDto: Partial<Image & SoftDeleteGetDto>): Promise<Image> => {
    return this.softDeleteService.getByParams(getImageDto);
  };

  getById = async (imageId: ImageId, softDeleteGetDto: SoftDeleteGetDto): Promise<Image> => {
    return this.softDeleteService.getById(imageId, softDeleteGetDto);
  };

  delete = async (imageId: ImageId, deletableDto: SoftDeleteDeleteDto) => {
    return this.softDeleteService.delete(imageId, deletableDto);
  };

  restore = async (imageId: ImageId) => {
    return this.softDeleteService.restore(imageId);
  };
}
