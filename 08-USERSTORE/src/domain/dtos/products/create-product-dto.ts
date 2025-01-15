import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly category: string,
    public readonly user: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, description, available, price, category, user } = props;

    if (!name) return ['Name is required'];
    if (!description) return ['Description is required'];
    if (!available) return ['Available is required'];
    if (!price) return ['Price is required'];
    if (!category) return ['Category is required'];
    if (!user) return ['User is required'];
    if (!Validators.isMongoId(category)) return ['Category is not a valid MongoId'];
    if (!Validators.isMongoId(user)) return ['User is not a valid MongoId'];

    return [
      undefined,
      new CreateProductDto(
        name,
        description,
        !!available,
        price,
        category,
        user,
      ),
    ];
  }
}
