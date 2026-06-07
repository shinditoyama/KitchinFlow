import { Request, Response } from "express";
import { CategoryService } from "@/services/category.service";
import { HttpException } from "@/middlewares/error-handler";

export class CategoryController {
  private service: CategoryService;
  constructor() {
    this.service = new CategoryService();
  }

  getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAllCategories();
    res.status(200).json(data);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.getCategoryById(String(id));
    res.status(200).json(data);
  };

  create = async (req: Request, res: Response) => {
    const newCategory = await this.service.createCategory(req.body);
    res.status(201).json(newCategory);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.updateCategory(String(id), req.body);
    res.status(200).json(data);
  };

  delete = async (req: Request, res: Response) => {
    const id = req.query.id;
    await this.service.deleteCategory(String(id));
    res.status(204).send();
  };
}
