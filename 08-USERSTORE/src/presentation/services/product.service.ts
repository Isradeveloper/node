import { ProductModel } from '../../data/mongo-db';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';

export class ProductService {
  async getProducts(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const [products, total] = await Promise.all([
      ProductModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('category')
        .populate('user'),
      // .populate('user', 'name email'),

      ProductModel.countDocuments(),
    ]);

    return {
      page,
      limit,
      total,
      products,
    };
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const { name, description, available, price, category, user } =
        createProductDto;

      const productExist = await ProductModel.findOne({ name });
      if (productExist) throw CustomError.badRequest('Product already exists');

      const product = new ProductModel({
        name,
        description,
        available,
        price,
        category,
        user,
      });
      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
