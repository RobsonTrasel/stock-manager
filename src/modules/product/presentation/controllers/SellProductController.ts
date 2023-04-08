import { Request, Response } from "express";
import { Controller } from "shared/interfaces/Controller";
import { BadRequestError } from "shared/errors/BadRequestError";
import { SellProductService } from "@modules/product/domain/services/SellProductService";

class SellProductController implements Controller {
  constructor(private readonly sellProductService: SellProductService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, quantity } = request.body;

    if (!id || !quantity) {
      throw new BadRequestError('Invalid request body');
    }

    const product = await this.sellProductService.execute({ id, quantity });
    return response.json(product);
  }
}

export { SellProductController };