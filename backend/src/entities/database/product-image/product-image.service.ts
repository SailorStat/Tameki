import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveFileReturnType } from "@utility/file/file.types";
import { ImageService } from "@utility/image/image.service";
import { Repository } from "typeorm";

import { GetAllProductImageDto } from "./dto/get-all-product-image.dto";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { ProductImage } from "./product-image.entity";

@Injectable()
export class ProductImageService extends ImageService {
  readonly entityName: string = "product_image";

  FileBuilder = ProductImage;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @InjectRepository(ProductImage) protected readonly repository: Repository<ProductImage>,
  ) {
    super(configService, repository);
  }

  protected declare createEntity: (file: Express.Multer.File) => ProductImage;

  save = async (file: Express.Multer.File, productId: number): SaveFileReturnType<ProductImage> => {
    const uploadsPath = this.configService.get("UPLOADS_PATH");
    const fileEntity = this.createEntity(file);
    const filePath = `${uploadsPath}/${fileEntity.url}`;

    fileEntity.productId = productId;

    try {
      await this.writeWithRetry(filePath, file);
    } catch (error) {
      return { errorMessage: error.message };
    }

    return this.repository.save(fileEntity);
  };

  declare getAll: (getAllProductImageDto: GetAllProductImageDto) => Promise<ProductImage[]>;

  declare getById: (productImageId: number) => Promise<ProductImage>;

  declare update: (productImageId: number, updateImageDto: UpdateProductImageDto) => Promise<ProductImage>;
}
