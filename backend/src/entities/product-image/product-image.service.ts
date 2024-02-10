import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SaveFileReturnType } from "../file/file.types";
import { ImageService } from "../image/image.service";
import GetAllProductImageDto from "./dto/get-all-product-image.dto";
import UpdateProductImageDto from "./dto/update-image.dto";
import { ProductImage } from "./product-image.entity";

@Injectable()
export class ProductImageService extends ImageService {
  FileBuilder = ProductImage;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @InjectRepository(ProductImage)
    protected readonly repository: Repository<ProductImage>,
  ) {
    super(configService, repository);
  }

  protected declare createEntity: (file: Express.Multer.File) => ProductImage;

  declare save: (file: Express.Multer.File) => SaveFileReturnType<ProductImage>;

  declare getAll: (getAllProductImageDto: GetAllProductImageDto) => Promise<ProductImage[]>;

  declare getById: (productImageId: number) => Promise<ProductImage>;

  declare update: (productImageId: number, updateImageDto: UpdateProductImageDto) => Promise<ProductImage>;
}
