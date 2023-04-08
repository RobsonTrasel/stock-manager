import { ProductId } from "../valueObjects/ProductId";
import { Product } from "../entities/Product";

interface ProductRepository {
  save(product: Product): Promise<Product>;
  delete(id: ProductId): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}

export { ProductRepository };