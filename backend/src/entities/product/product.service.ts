import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SoftDeleteDeleteDto } from "src/entities/softDelete/dto/softDelete.delete.dto";
import { SoftDeleteGetDto } from "src/entities/softDelete/dto/softDelete.get.dto";
import { SoftDeleteGetAllDto } from "src/entities/softDelete/dto/softDelete.getAll.dto";
import { SoftDeleteService } from "src/entities/softDelete/softDelete.service";
import { Repository } from "typeorm";

import CreateProductDto from "./dto/create-product.dto";
import UpdateProductDto from "./dto/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
  softDeleteService: SoftDeleteService<Product>;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.softDeleteService = new SoftDeleteService(productRepository);
  }

  getAll = async (softDeleteGetAllDto: SoftDeleteGetAllDto): Promise<Product[]> => {
    const { page = 1, limit = 20, ...params } = softDeleteGetAllDto;

    return this.softDeleteService.getAll({ limit, page, ...params });
  };

  getOne = async (productId: number, softDeleteGetDto: SoftDeleteGetDto): Promise<Product> => {
    return this.softDeleteService.getOne(productId, softDeleteGetDto);
  };

  create = async (createProductDto: CreateProductDto) => {
    const toCreateProduct = this.productRepository.create(createProductDto);
    const createdProduct = await this.productRepository.save(toCreateProduct);

    return this.productRepository
      .createQueryBuilder("product")
      .where("product.id = :productId", { productId: createdProduct.id })
      .getOne();
  };

  update = async (productId: number, updateProductDto: UpdateProductDto) => {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new HttpException("Товар не найден", HttpStatus.BAD_REQUEST);
    }

    return this.productRepository.update(productId, updateProductDto);
  };

  delete = async (productId: number, deletableDto: SoftDeleteDeleteDto) => {
    return this.softDeleteService.delete(productId, deletableDto);
  };

  restore = async (productId: number) => {
    return this.softDeleteService.restore(productId);
  };
}
