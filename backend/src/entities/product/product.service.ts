import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assertFoundEntity } from "src/asserts/http.assert";
import { SoftDeleteDeleteDto } from "src/entities/soft-delete/dto/delete-soft-delete.dto";
import { SoftDeleteService } from "src/entities/soft-delete/soft-delete.service";
import { getWhereParams } from "src/utils/getWhereParams";
import { Repository, SelectQueryBuilder } from "typeorm";

import { BaseService } from "../base/base.service";
import { HiddenStateHideDto } from "../hidden-state/dto/hide-hidden-state.dto";
import { HiddenStateService } from "../hidden-state/hidden-state.service";
import { ProductImageService } from "../product-image/product-image.service";
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

  hiddenStateService: HiddenStateService<Product>;

  constructor(
    @InjectRepository(Product) protected readonly repository: Repository<Product>,
    protected readonly productImageService: ProductImageService,
  ) {
    super(repository);
    this.softDeleteService = new SoftDeleteService(repository, this.entityName);
    this.hiddenStateService = new HiddenStateService(repository, this.entityName);
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
    this.hiddenStateService.getHiddenStateModify(queryBuilder, getAllProductsDto);

    return this.softDeleteService.getSoftDeleteModify(queryBuilder, getAllProductsDto).getMany();
  };

  getByParams = async (getByParamsDto: Partial<GetProductDto & Product>): Promise<Product> => {
    const queryBuilder = this.repository.createQueryBuilder(this.entityName).where(this.getWhereParams(getByParamsDto));

    this.getProductModify(queryBuilder);
    this.getBaseModify(queryBuilder, getByParamsDto);
    this.hiddenStateService.getHiddenStateModify(queryBuilder, getByParamsDto);

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
    this.hiddenStateService.getHiddenStateModify(queryBuilder, getProductDto);

    const product = await this.softDeleteService.getSoftDeleteModify(queryBuilder, getProductDto).getOne();

    assertFoundEntity(product);

    return product;
  };

  create = async ({ images, ...createDto }: CreateProductDto) => {
    const toCreateEntity = this.repository.create(createDto);

    createDto.hiddenReason && (toCreateEntity.hiddenAt = new Date());

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
    return this.softDeleteService.restore(productId);
  };

  hide = async (productId: number, hideDto: HiddenStateHideDto) => {
    return this.hiddenStateService.hide(productId, hideDto);
  };

  show = async (productId: number) => {
    return this.hiddenStateService.show(productId);
  };
}
