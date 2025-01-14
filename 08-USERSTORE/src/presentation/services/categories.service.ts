import { CategoryModel } from '../../data/mongo-db';
import {
  CategoryEntity,
  CreateCategoryDto,
  CustomError,
  UserEntity,
} from '../../domain';

export class CategoriesService {
  constructor() {}

  public async getCategories() {
    const categories = await CategoryModel.find();
    return categories.map((category) => CategoryEntity.fromObject(category));
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
