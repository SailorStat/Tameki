import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import CreateProductDto from "./dto/createProduct.dto";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private readonly productRepository: typeof Product) {}

  getAll = async () => {
    return this.productRepository.findAll();
  };

  getOne = async (productId: string) => {
    // return await this.productRepository.({ id: productId });
  };

  create = async (createProductDto: CreateProductDto) => {
    return this.productRepository.create(createProductDto);
  };

  update = async () => {
    // if (!product.id) {
    //   throw new Error("ID продукта не указан");
    // }
    // return await ProductModel.findByIdAndUpdate(product.id, product, { new: true });
  };

  delete = async (productId?: string) => {
    if (!productId) {
      throw new Error("ID продукта не указан");
    }

    // return await ProductModel.findByIdAndDelete(productId);
  };
}
