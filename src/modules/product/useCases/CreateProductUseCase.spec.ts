import { Product } from '@modules/product/domain/entities/Product';
import { MySQLConnection } from 'shared/database/MySQLConnection';
import { MySQLProductRepository } from '@modules/product/infrastructure/repositories/MySQLProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase'

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;

  beforeAll(() => {
    const connection = new MySQLConnection();
    const productRepository = new MySQLProductRepository(connection)
    createProductUseCase = new CreateProductUseCase(productRepository);
  })

  it('should create a product without stock', async () => {
    const product = await createProductUseCase.execute({
      name: 'Product Test',
      price: 10
    });
    
    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product Test');
    expect(product.price).toBe(10);
    expect(product.stock).toBeUndefined();
      
  })

  it('should create a product with stock', async () => {
    const product = await createProductUseCase.execute({
      name: 'Product Test',
      price: 10,
      stock: 100
    });

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product Test Stock');
    expect(product.price).toBe(20);
    expect(product.stock?.quantity).toBe(100);
  })
})