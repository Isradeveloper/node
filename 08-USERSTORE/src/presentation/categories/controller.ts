import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { CategoriesService } from '../services/categories.service';

export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  };

  getCategories = async (req: Request, res: Response) => {
    this.categoriesService
      .getCategories()
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    this.categoriesService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };
}
