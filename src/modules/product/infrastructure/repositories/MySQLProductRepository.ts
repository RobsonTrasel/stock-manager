import { MySQLConnection } from "shared/database/MySQLConnection";
import { NotFoundError } from "shared/errors/NotFoundError";
import { BadRequestError } from "shared/errors/BadRequestError";
import { Product } from "@modules/product/domain/entities/Product";
import { ProductId } from "@modules/product/domain/valueObjects/ProductId";
import { ProductRepository } from "@modules/product/domain/repositories/ProductRepository";
import { Stock } from "@modules/product/domain/entities/Stock";

class MySQLProductRepository implements ProductRepository {
  private readonly TABLE_NAME = 'products';

  constructor(private readonly connection: MySQLConnection) {}

  async save(product: Product): Promise<Product> {
    const { id, name, price, stock } = product;
    const data = {
      id: id.value,
      name,
      price,
      stock: stock ? stock.quantity : null
    };

    const [result] = await this.connection.execute(
      `INSERT INTO ${this.TABLE_NAME} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data]
    );

    if (result.affectedRows !== 1) {
      throw new BadRequestError('Failed to save product');
    }

    return product;
  }

  async delete(id: ProductId): Promise<void> {
    const [result] = await this.connection.execute(`DELETE FROM ${this.TABLE_NAME} WHERE id = ?`, [id.value]);

    if (result.affectedRows !== 1) {
      throw new NotFoundError();
    }
  }

  async findById(id: ProductId): Promise<Product | null> {
    const [rows] = await this.connection.execute(`SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`, [id.value]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const { id: productId, name, price, stock } = rows[0];
    const product = new Product({
      id: new ProductId(productId),
      name,
      price,
      stock: stock !== null ? new Stock({ quantity: stock }) : undefined
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const [rows] = await this.connection.execute(`SELECT * FROM ${this.TABLE_NAME}`);

    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    const products = rows.map(row => {
      const { id, name, price, stock } = row;
      return new Product({
        id: new ProductId(id),
        name,
        price,
        stock: stock !== null ? new Stock({ quantity: stock }) : undefined
      });
    });

    return products;
  }
}

export { MySQLProductRepository };