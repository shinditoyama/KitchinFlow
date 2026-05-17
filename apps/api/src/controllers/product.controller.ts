import { Request, Response } from "express";
import { ProductService } from "@/services/product.service";

const product = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const [newProduct] = await product.create(req.body);
    res.status(201).json(newProduct);
  }

  async getAll(_: Request, res: Response) {
    const data = await product.list();
    res.status(200).json(data);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await product.findById(String(id));
    res.status(200).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await product.update(String(id), req.body);
    res.status(200).json(data);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await product.delete(String(id));
    res.status(204).send();
  }
}
