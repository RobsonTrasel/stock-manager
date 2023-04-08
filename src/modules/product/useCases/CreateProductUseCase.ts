import { Product } from "../domain/entities/Product";
import { ProductRepository } from "../domain/repositories/ProductRepository";
import { Stock } from "../domain/entities/Stock";

interface CreateProductData {
  name: string;
  price: number;
  stock?: number;
}

class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductData): Promise<Product> {
    const { name, price, stock } = data;
    const product = new Product({ name, price });

    if (stock) {
      product.stock = new Stock({ quantity: stock });
    }

    return this.productRepository.save(product);
  }
}

export { CreateProductUseCase };

