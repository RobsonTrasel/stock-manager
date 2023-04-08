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
  readonly stock?: Stock;

  constructor(data: ProductData) {
    this.id = data.id ?? new ProductId();
    this.name = data.name;
    this.price = data.price;
    this.stock = data.stock;
  }
}

export { Product };