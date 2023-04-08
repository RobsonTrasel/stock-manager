import { AppError } from './AppError';

class NotFoundError extends AppError {
  constructor() {
    super('Not Found', 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export { NotFoundError };