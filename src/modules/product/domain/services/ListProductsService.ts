import { Service } from "shared/interfaces/Service";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

class ListProductsService implements Service {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}

export { ListProductsService };