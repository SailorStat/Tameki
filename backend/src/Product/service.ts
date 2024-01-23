import fileService from "../fileService.js";
import generateProductArticle from "../generateProductArticle.js";
import ProductModel, { Product } from "./model.js";

class ProductService {
  create = async (product: Product) => {
    const savedImages = (Array.isArray(product.images) ? product.images : [product.images]).map(fileService.save);

    const toCreateProduct: Product = {
      ...product,
      article: generateProductArticle(),
      estimation: 0,
      images: savedImages,
      reviews: 0,
      soldTimes: 0,
    };

    return await ProductModel.create(toCreateProduct);
  };

  getAll = async () => {
    return await ProductModel.find();
  };

  getOne = async (productId?: string) => {
    if (!productId) {
      throw new Error("ID продукта не указан");
    }

    return await ProductModel.findById(productId);
  };

  update = async (product: Product) => {
    if (!product.id) {
      throw new Error("ID продукта не указан");
    }

    return await ProductModel.findByIdAndUpdate(product.id, product, { new: true });
  };

  delete = async (productId?: string) => {
    if (!productId) {
      throw new Error("ID продукта не указан");
    }

    return await ProductModel.findByIdAndDelete(productId);
  };
}

const productService = new ProductService();

export default productService;
