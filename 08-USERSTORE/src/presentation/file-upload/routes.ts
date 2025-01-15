import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadController } from './controller';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(['products', 'users', 'categories']));

    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}
