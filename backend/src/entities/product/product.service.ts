import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseGetAllDto } from "src/entities/base/dto/get-all-base.dto";
import { SoftDeleteDeleteDto } from "src/entities/soft-delete/dto/delete-soft-delete.dto";
import { SoftDeleteGetDto } from "src/entities/soft-delete/dto/get-soft-delete.dto";
import { SoftDeleteService } from "src/entities/soft-delete/soft-delete.service";
import { Repository } from "typeorm";

import { BaseService } from "../base/base.service";
import CreateProductDto from "./dto/create-product.dto";
import UpdateProductDto from "./dto/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService extends BaseService<
  Product,
  BaseGetAllDto,
  SoftDeleteGetDto,
  CreateProductDto,
  UpdateProductDto
> {
  softDeleteService: SoftDeleteService<Product>;

  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {
    super(repository);
    this.softDeleteService = new SoftDeleteService(repository);
  }

  getAll = async (softDeleteGetAllDto: BaseGetAllDto): Promise<Product[]> => {
    const { page = 1, limit = 20, ...params } = softDeleteGetAllDto;

    return this.softDeleteService.getAll({ limit, page, ...params });
  };

  getByParams = async (getProductDto: Partial<Product & SoftDeleteGetDto>): Promise<Product> => {
    return this.softDeleteService.getByParams(getProductDto);
  };

  getById = async (productId: number, softDeleteGetDto: SoftDeleteGetDto): Promise<Product> => {
    return this.softDeleteService.getById(productId, softDeleteGetDto);
  };

  delete = async (productId: number, deletableDto: SoftDeleteDeleteDto) => {
    return this.softDeleteService.delete(productId, deletableDto);
  };

  restore = async (productId: number) => {
    return this.softDeleteService.restore(productId);
  };
}
