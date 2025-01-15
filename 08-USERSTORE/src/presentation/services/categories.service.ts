import { CategoryModel } from '../../data/mongo-db';
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from '../../domain';

export class CategoriesService {
  constructor() {}

  public async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    // const total = await CategoryModel.countDocuments();

    // const categories = await CategoryModel.find()
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    const [total, categories] = await Promise.all([
      CategoryModel.countDocuments(),
      CategoryModel.find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    return {
      page,
      limit,
      total,
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        available: category.available,
      })),
    };
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity,
  ) {
    try {
      const categoryExists = await CategoryModel.findOne({
        name: createCategoryDto.name,
      });

      if (categoryExists)
        throw CustomError.badRequest('Category already exists');

      const category = await CategoryModel.create({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
