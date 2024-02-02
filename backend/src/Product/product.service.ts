import fileService from "../fileService";
import generateProductArticle from "../generateProductArticle";

class ProductService {
  create = async () => {
    // const savedImages = (Array.isArray(product.images) ? product.images : [product.images]).map(fileService.save);
    // const toCreateProduct= {
    //   ...product,
    //   article: generateProductArticle(),
    //   estimation: 0,
    //   images: savedImages,
    //   reviews: 0,
    //   soldTimes: 0,
    // };
    // return await ProductModel.create(toCreateProduct);
  };

  getAll = async () => {
    // return await ProductModel.find();
  };

  getOne = async (productId?: string) => {
    if (!productId) {
      throw new Error("ID продукта не указан");
    }

    // return await ProductModel.findById(productId);
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

export default ProductService;
