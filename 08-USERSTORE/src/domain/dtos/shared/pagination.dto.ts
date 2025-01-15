export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(object: { [key: string]: any }): [string?, PaginationDto?] {
    const { page, limit } = object;

    if (page < 1) return ['Page must be greater than 0'];
    if (limit < 1) return ['Limit must be greater than 0'];

    return [undefined, new PaginationDto(page, limit)];
  }
}
