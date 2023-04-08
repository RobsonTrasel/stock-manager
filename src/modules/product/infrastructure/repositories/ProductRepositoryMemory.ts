import { NotFoundError } from "shared/errors/NotFoundError";
import { Product } from "@modules/product/domain/entities/Product";
import { ProductId } from "@modules/product/domain/valueObjects/ProductId";
import { ProductRepository } from "@modules/product/domain/repositories/ProductRepository";

class ProductRepositoryMemory implements ProductRepository {
  private readonly products: Product[] = [];

  async save(product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id.value === product.id.value);

    if (index >= 0) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }

    return product;
  }

  async delete(id: ProductId): Promise<void> {
    const index = this.products.findIndex(p => p.id.value === id.value);

    if (index >= 0) {
      this.products.splice(index, 1);
    } else {
      throw new NotFoundError();
    }
  }

  async findById(id: ProductId): Promise<Product | null> {
    const product = this.products.find(p => p.id.value === id.value);
    return product ? product : null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }
}

export { ProductRepositoryMemory }