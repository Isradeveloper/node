import { CustomError } from '../../errors/custom.error';

export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean,
  ) {}

  static fromObject(obj: { [key: string]: any }): CategoryEntity {
    const { id, _id, name, available } = obj;

    if (!_id && !id) throw CustomError.badRequest('Category id is required');

    if (!name) throw CustomError.badRequest('Category name is required');

    if (!available)
      throw CustomError.badRequest('Category available is required');

    return new CategoryEntity(_id || id, name, available);
  }
}
