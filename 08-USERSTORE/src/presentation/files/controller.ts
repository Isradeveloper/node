import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export class FileController {
  getFile(req: Request, res: Response) {
    const { path: pathParam = '', filename = '' } = req.params;

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      pathParam,
      filename,
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'File not found',
      });
    }

    res.sendFile(filePath);

  }
}
