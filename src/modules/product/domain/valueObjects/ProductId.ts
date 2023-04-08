import { v4 as uuid4 } from 'uuid'

class ProductId {
  readonly value: string

  constructor(
    id?: string
  ) {
    this.value = id ? id : uuid4()
  }
}

export { ProductId }