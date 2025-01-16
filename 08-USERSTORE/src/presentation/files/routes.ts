import { Router } from 'express';
import { FileController } from './controller';

export class FileRoutes {
  static get routes(): Router {
    const router = Router();

    const fileController = new FileController();

    router.get('/:path/:filename', fileController.getFile);

    return router;
  }
}
