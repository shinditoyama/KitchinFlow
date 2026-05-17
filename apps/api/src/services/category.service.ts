import { db, eq } from "@repo/db";
import { categories } from "@repo/db/schema";
import { CategoryInput } from "@repo/utils/validation/category";
import { AppError } from "@/middlewares/error-handler";

export class CategoryService {
  async create(data: CategoryInput) {
    return await db.insert(categories).values(data).returning();
  }

  async list() {
    return await db.select().from(categories);
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!result) throw new AppError("Categoria não encontrada", 404);

    return result;
  }

  async update(id: string, data: Partial<CategoryInput>) {
    const [result] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();

    if (!result)
      throw new AppError(
        "Não foi possível atualizar: categoria não encontrada",
        404,
      );

    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!result)
      throw new AppError(
        "Não foi possível excluir: categoria não encontrada",
        404,
      );

    return result;
  }
}
