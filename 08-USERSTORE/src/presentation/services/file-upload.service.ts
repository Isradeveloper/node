import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain';
import fs from 'fs';
import path from 'path';
import { UUIDAdapter } from '../../config';
export class FileUploadService {
  constructor(private readonly uuid = UUIDAdapter.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadFile(
    file: UploadedFile,
    folder: string = 'uploads/',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `File extension not allowed: ${fileExtension}, valid ones are: ${validExtensions.join(
            ', ',
          )}`,
        );
      }

      const destination = path.resolve(__dirname, '../../..', folder);
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return fileName;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async uploadMultipleFiles(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {
    try {
      const fileNames = await Promise.all(
        files.map((file) => this.uploadFile(file, folder, validExtensions)),
      );
      return fileNames;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
