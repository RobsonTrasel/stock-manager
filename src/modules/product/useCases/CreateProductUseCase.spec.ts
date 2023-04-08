import { Product } from '../domain/entities/Product';
import { MySQLProductRepository } from '../infrastructure/repositories/MySQLProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase'
import { MySQLConnection } from '../../../shared/database/MySQLConnection';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;

  beforeAll(() => {
    const connectionOptions = {
      host: process.env.HOST,
      port: 3306,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    };
    
    const connection = new MySQLConnection(connectionOptions)
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