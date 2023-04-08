import { Service } from 'shared/interfaces/Service';
import { BadRequestError } from 'shared/errors/BadRequestError';
import { ProductId } from "../valueObjects/ProductId";
import { ProductRepository } from '../../domain/repositories/ProductRepository';

interface StockQueryServiceData {
  id: ProductId;
}

class StockQueryService implements Service {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: StockQueryServiceData): Promise<number> {
    const product = await this.productRepository.findById(data.id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    if (!product.stock) {
      throw new BadRequestError('This product does not have stock');
    }

    return product.stock.quantity;
  }
}

export { StockQueryService };