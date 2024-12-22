import fs from 'fs/promises';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  filePath?: string;
  content: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() /**
   * DI - Dependency Injection
   */ {}

  execute({
    content,
    filePath = 'outputs/',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    try {
      fs.mkdir(filePath, { recursive: true });
      fs.writeFile(`${filePath}${fileName}.txt`, content, 'utf-8');
      console.log(`File saved at ${filePath}${fileName}.txt`);
      return true;
    } catch (error) {
      console.error(
        `Error saving file at ${filePath}${fileName}.txt`,
        `\n${error}`,
      );
      return false;
    }
  }
}
