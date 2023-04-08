import { AppError } from "./AppError";

class InternalServerError extends AppError {
  constructor() {
    super('Internal Server Error', 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export { InternalServerError };