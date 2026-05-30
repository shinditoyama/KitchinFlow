import { db, eq, count } from "@repo/db";
import { categories, products } from "@repo/db/schema";
import { CategoryFormValues } from "@repo/utils/validation/category";
import { AppError } from "@/middlewares/error-handler";

export class CategoryService {
  async create(data: CategoryFormValues) {
    return await db.insert(categories).values(data).returning();
  }

  async list() {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        count: count(products.id),
      })
      .from(categories)
      .leftJoin(products, eq(products.categoryId, categories.id))
      .groupBy(categories.id);

    return result;
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!result) throw new AppError("Categoria não encontrada", 404);

    return result;
  }

  async update(id: string, data: Partial<CategoryFormValues>) {
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
