import { AppError } from './AppError';

interface ValidationErrorItem {
  field: string;
  message: string;
}

class ValidationError extends AppError {
  constructor(public readonly errors: ValidationErrorItem[]) {
    super('Validation Error', 422);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export { ValidationError, ValidationErrorItem };