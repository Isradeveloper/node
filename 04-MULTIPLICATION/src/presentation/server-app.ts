import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName?: string;
  filePath?: string;
}

export class ServerApp {
  static async run(options: RunOptions) {
    console.log('Server running');

    const table = new CreateTable().execute(options);
    const wasCreated = new SaveFile().execute({
      content: table,
      fileName: `${options.fileName}`,
      filePath: `${options.filePath}/`,
    });

    if (options.showTable) {
      console.log(table);
    }
  }
}
