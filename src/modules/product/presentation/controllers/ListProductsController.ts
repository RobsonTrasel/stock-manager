import { Request, Response } from "express";
import { Controller } from "shared/interfaces/Controller";
import { ListProductsService } from "@modules/product/domain/services/ListProductsService";

class ListProductsController implements Controller {
  constructor(private readonly listProductsService: ListProductsService) {}
  
  async handle(request: Request, response: Response): Promise<Response> {
    const products = await this.listProductsService.execute();
    return response.json(products);
  }
  }
  
export { ListProductsController };