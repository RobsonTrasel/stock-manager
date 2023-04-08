import { ProductId } from "../valueObjects/ProductId";
import { Stock } from "./Stock";

interface ProductData {
  id?: ProductId;
  name: string;
  price: number;
  stock?: Stock;
}

class Product {
  readonly id: ProductId;
  readonly name: string;
  readonly price: number;
  private _stock?: Stock;

  constructor(data: ProductData) {
    this.id = data.id ?? new ProductId();
    this.name = data.name;
    this.price = data.price;
    this._stock = data.stock;
  }

  get stock(): Stock | undefined {
    return this._stock;
  }

  updateStock(stock: Stock): void {
    this._stock = stock;
  }

}

export { Product };