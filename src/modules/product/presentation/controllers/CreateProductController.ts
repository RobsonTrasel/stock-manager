import { Request, Response } from "express";
import { Controller } from "shared/interfaces/Controller";
import { CreateProductService } from "@modules/product/domain/services/CreateProductService";

class CreateProductController implements Controller {
  constructor(private readonly createProductService: CreateProductService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const product = await this.createProductService.execute({ name, price, quantity });
    return response.status(201).json(product);
  }
}

export { CreateProductController };