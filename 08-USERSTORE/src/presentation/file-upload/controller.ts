import { Request, Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';
import { CustomError } from '../../domain';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  };

  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService
      .uploadFile(file, `uploads/${type}`)
      .then((fileName) => {
        res.json({ fileName });
      })
      .catch((error) => this.handleError(error, res));
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    const type = req.params.type;

    const files = req.body.files as UploadedFile[];

    this.fileUploadService
      .uploadMultipleFiles(files, `uploads/${type}`)
      .then((fileNames) => {
        res.json({ fileNames });
      })
      .catch((error) => this.handleError(error, res));
  };
}
