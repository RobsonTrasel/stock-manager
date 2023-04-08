import { BadRequestError } from "shared/errors/BadRequestError";
import { Service } from "shared/interfaces/Service";
import { Product } from "../entities/Product";
import { ProductId } from "../valueObjects/ProductId";
import { ProductRepository } from "../repositories/ProductRepository";

interface SellProductServiceData {
  id: ProductId;
  quantity: number;
}

class SellProductService implements Service {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: SellProductServiceData): Promise<Product> {
    const product = await this.productRepository.findById(data.id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    if (!product.stock) {
      throw new BadRequestError('This product does not have stock');
    }

    const newStock = product.stock.subtract(data.quantity);

    if (newStock.quantity < 0) {
      throw new BadRequestError('Insufficient product stock');
    }

    const updatedProduct = new Product({ ...product, stock: newStock });
    return this.productRepository.save(updatedProduct);
  }
}

export { SellProductService };