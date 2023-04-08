import { Request, Response } from "express";
import { Controller } from "shared/interfaces/Controller";
import { BadRequestError } from "shared/errors/BadRequestError";
import { StockQueryService } from "@modules/product/domain/services/StockQueryService";
import { ProductId } from "@modules/product/domain/valueObjects/ProductId";

class StockQueryController implements Controller {
  constructor(private readonly stockQueryService: StockQueryService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new BadRequestError('Invalid request parameter');
    }

    const quantity = await this.stockQueryService.execute({ id: new ProductId(id)});
    return response.json({ quantity });
  }
}

export { StockQueryController };