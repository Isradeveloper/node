import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductService } from '../services/product.service';
import { ProductController } from './controller';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    router.get('/', [AuthMiddleware.validateJWT], productController.getProducts);
    router.post('/', [AuthMiddleware.validateJWT], productController.createProduct);
    return router;
  }
}
