import { Request, Response } from 'express';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  };

  getProducts = (req: Request, res: Response) => {
    const [error, paginationDto] = PaginationDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res));
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ message: error });

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };
}
