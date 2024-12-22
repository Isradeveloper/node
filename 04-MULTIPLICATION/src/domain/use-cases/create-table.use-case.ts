export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() /**
   * DI - Dependency Injection
   */ {}

  execute({ base, limit }: CreateTableOptions): string {
    let outputMessage = '';
    for (let index = 1; index <= limit; index++) {
      outputMessage += `${base} x ${index} = ${base * index}\n`;
    }
    return outputMessage;
  }
}
