import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assertFoundEntity } from "src/asserts/http.assert";
import { SoftDeleteDeleteDto } from "src/entities/soft-delete/dto/delete-soft-delete.dto";
import { SoftDeleteService } from "src/entities/soft-delete/soft-delete.service";
import { getWhereParams } from "src/utils/getWhereParams";
import { Repository, SelectQueryBuilder } from "typeorm";

import { BaseService } from "../base/base.service";
import { ProductImageService } from "../product-image/product-image.service";
import assertDeletedEntity from "../soft-delete/asserts/deleted-entity.assert";
import CreateProductDto from "./dto/create-product.dto";
import GetAllProductsDto from "./dto/get-all-products.dto";
import GetProductDto from "./dto/get-product..dto";
import UpdateProductDto from "./dto/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService extends BaseService<
  Product,
  GetProductDto,
  GetAllProductsDto,
  CreateProductDto,
  UpdateProductDto
> {
  readonly entityName: string = "product";

  softDeleteService: SoftDeleteService<Product>;

  constructor(
    @InjectRepository(Product) protected readonly repository: Repository<Product>,
    protected readonly productImageService: ProductImageService,
  ) {
    super(repository);
    this.softDeleteService = new SoftDeleteService(repository, this.entityName);
  }

  protected getProductModify = (
    queryBuilder: SelectQueryBuilder<Product>,
    _?: GetProductDto,
  ): SelectQueryBuilder<Product> =>
    queryBuilder.leftJoinAndSelect(`${this.entityName}.images`, this.productImageService.entityName);

  protected getWhereParams = (params: object): Partial<Product> => {
    const product = new Product();

    delete product.images;

    return getWhereParams(params, product);
  };

  getAll = async (getAllProductsDto: GetAllProductsDto): Promise<Product[]> => {
    const { limit = 20, page = 1 } = getAllProductsDto;

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(this.getWhereParams(getAllProductsDto));

    this.getBaseModify(queryBuilder, getAllProductsDto);
    this.getProductModify(queryBuilder, getAllProductsDto);
    this.getBaseManyModify(queryBuilder, { ...getAllProductsDto, limit, page });

    return this.softDeleteService.getSoftDeleteModify(queryBuilder, getAllProductsDto).getMany();
  };

  getByParams = async (getByParamsDto: Partial<GetProductDto & Product>): Promise<Product> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getByParamsDto));

    this.getProductModify(queryBuilder);
    this.getBaseModify(queryBuilder, getByParamsDto);

    const product = await this.softDeleteService.getSoftDeleteModify(queryBuilder, getByParamsDto).getOne();

    assertFoundEntity(product);

    return product;
  };

  getById = async (productId: number, getProductDto: GetProductDto): Promise<Product> => {
    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :productId`, { productId });

    this.getProductModify(queryBuilder);
    this.getBaseModify(queryBuilder, getProductDto);

    const product = await this.softDeleteService.getSoftDeleteModify(queryBuilder, getProductDto).getOne();

    assertFoundEntity(product);

    return product;
  };

  create = async ({ images, ...createDto }: CreateProductDto) => {
    const toCreateEntity = this.repository.create(createDto);
    const createdProduct = await this.repository.save(toCreateEntity);

    await Promise.allSettled(
      images.map(async (image) => {
        await this.productImageService.save(image, createdProduct.id);
      }),
    );

    const queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .where(`${this.entityName}.id = :productId`, { productId: createdProduct.id });

    return this.getProductModify(queryBuilder).getOne();
  };

  delete = async (productId: number, deletableDto: SoftDeleteDeleteDto) => {
    return this.softDeleteService.delete(productId, deletableDto);
  };

  restore = async (productId: number) => {
    const entity = await this.repository
      .createQueryBuilder(this.entityName)
      .withDeleted()
      .addSelect([`${this.entityName}.deletedAt`, `${this.entityName}.deletionReason`])
      .where(`${this.entityName}.id = :productId`, { productId })
      .getOne();

    assertFoundEntity(entity);
    assertDeletedEntity(entity);

    await this.repository
      .createQueryBuilder(this.entityName)
      .update()
      .set({ deletedAt: null, deletionReason: null })
      .where(`${this.entityName}.id = :productId`, { productId })
      .execute();

    return this.getById(productId, {});
  };
}
