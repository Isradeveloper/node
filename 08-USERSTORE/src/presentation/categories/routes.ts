import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoriesService } from '../services/categories.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoriesService = new CategoriesService();
    const controller = new CategoryController(categoriesService);

    router.get('/', [AuthMiddleware.validateJWT], controller.getCategories);
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}
