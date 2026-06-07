import { asc, count, eq } from "drizzle-orm";
import { db } from "../config";
import { categories, products, NewCategory } from "../schema";

export class CategoryRepository {
  async findAll() {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        count: count(products.id),
      })
      .from(categories)
      .leftJoin(products, eq(products.categoryId, categories.id))
      .orderBy(asc(categories.name))
      .groupBy(categories.id);

    return result;
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return result;
  }

  async create(data: NewCategory) {
    const [result] = await db.insert(categories).values(data).returning();
    return result;
  }

  async update(id: string, data: Partial<NewCategory>) {
    const [result] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    return result;
  }
}
