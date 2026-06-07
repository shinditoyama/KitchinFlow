import { Request, Response } from "express";
import { ProductService } from "@/services/product.service";

export class ProductController {
  private service: ProductService;
  constructor() {
    this.service = new ProductService();
  }

  getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAllProducts();
    res.status(200).json(data);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.getProductById(String(id));
    res.status(200).json(data);
  };

  create = async (req: Request, res: Response) => {
    const newProduct = await this.service.createProduct(req.body);
    res.status(201).json(newProduct);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.updateProduct(String(id), req.body);
    res.status(200).json(data);
  };

  delete = async (req: Request, res: Response) => {
    const id = req.query.id;
    await this.service.deleteProduct(String(id));
    res.status(204).send();
  };

  toggle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.toggleProduct(String(id));
    res.status(200).json(data);
  };
}
