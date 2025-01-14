export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available } = object;

    if (!name) return ['Name is required'];

    if (typeof available !== 'boolean') return ['Available must be a boolean'];

    return [undefined, new CreateCategoryDto(name, available)];
  }
}
