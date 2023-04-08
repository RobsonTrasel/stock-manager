import { Service } from "shared/interfaces/Service";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { Stock } from "../entities/Stock";

interface CreateProductServiceData {
  name: string;
  price: number;
  quantity?: number;
}

class CreateProductService implements Service {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductServiceData): Promise<Product> {
    const stock = data.quantity ? new Stock({ quantity: data.quantity }) : undefined;
    const product = new Product({ name: data.name, price: data.price, stock });
    return this.productRepository.save(product);
  }
}

export { CreateProductService };