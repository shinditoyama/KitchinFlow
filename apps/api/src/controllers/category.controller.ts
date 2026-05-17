import { Request, Response } from "express";
import { CategoryService } from "@/services/category.service";

const category = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    const [newCategory] = await category.create(req.body);
    res.status(201).json(newCategory);
  }

  async getAll(_: Request, res: Response) {
    const data = await category.list();
    res.status(200).json(data);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await category.findById(String(id));
    res.status(200).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await category.update(String(id), req.body);
    res.status(200).json(data);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await category.delete(String(id));
    res.status(204).send();
  }
}
