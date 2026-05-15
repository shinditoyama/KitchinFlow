import { Request, Response } from "express";
import { ProductService } from "@/services/product.service";

const product = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    try {
      const [newProduct] = await product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_: Request, res: Response) {
    const data = await product.listAll();
    res.status(200).json(data);
  }
}
