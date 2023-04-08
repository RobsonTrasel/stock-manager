interface StockData {
  quantity: number;
}

class Stock {
  readonly quantity: number

  constructor(data: StockData) {
    this.quantity = data.quantity;
  }

  subtract(quantity: number): Stock {
    return new Stock({ quantity: this.quantity - quantity });
  }

  add(quantity: number): Stock {
    return new Stock({ quantity: this.quantity + quantity });
  }
}

export { Stock };