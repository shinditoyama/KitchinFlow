import { CategoryRepository } from "@repo/db";
import { InsertCategory } from "@repo/utils/validation/category";
import { HttpException } from "@/middlewares/error-handler";

export class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories() {
    return await this.repository.findAll();
  }

  async getCategoryById(id: string) {
    const result = await this.repository.findById(id);
    if (!result) throw new HttpException(404, "Categoria não encontrada");

    return result;
  }

  async createCategory(data: InsertCategory) {
    return await this.repository.create(data);
  }

  async updateCategory(id: string, data: Partial<InsertCategory>) {
    const result = await this.repository.update(id, data);
    if (!result) throw new HttpException(404, "ID da categoria não encontrada");

    return result;
  }

  async deleteCategory(id: string) {
    const result = await this.repository.delete(id);
    if (!result) throw new HttpException(404, "ID da categoria não encontrada");

    return result;
  }
}
