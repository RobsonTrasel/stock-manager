import { Router } from "express";
import { CreateProductController } from "../controllers/CreateProductController";
import { ListProductsController } from "../controllers/ListProductsController";
import { SellProductController } from "../controllers/SellProductController";
import { StockQueryController } from "../controllers/StockQueryController";
import { connection } from "shared/database/MySQLConnection";
import { MySQLProductRepository } from "@modules/product/infrastructure/repositories/MySQLProductRepository";
import { CreateProductService } from "@modules/product/domain/services/CreateProductService";
import { ListProductsService } from "@modules/product/domain/services/ListProductsService";
import { SellProductService } from "@modules/product/domain/services/SellProductService";
import { StockQueryService } from "@modules/product/domain/services/StockQueryService";

const router = Router()
const productRepository = new MySQLProductRepository(connection)

router.post('/', (request, response) => {
  const createProductService = new CreateProductService(productRepository);
  const createProductController = new CreateProductController(createProductService);
  return createProductController.handle(request, response);
});

router.get('/', (request, response) => {
  const listProductsService = new ListProductsService(productRepository);
  const listProductsController = new ListProductsController(listProductsService);
  return listProductsController.handle(request, response);
});

router.post('/sell', (request, response) => {
  const sellProductService = new SellProductService(productRepository);
  const sellProductController = new SellProductController(sellProductService);
  return sellProductController.handle(request, response);
});

router.get('/:id/stock', (request, response) => {
  const stockQueryService = new StockQueryService(productRepository);
  const stockQueryController = new StockQueryController(stockQueryService);
  return stockQueryController.handle(request, response);
});

export { router };
