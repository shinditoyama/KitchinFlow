import { asc, eq } from "drizzle-orm";
import { db } from "../config";
import { products, categories, NewProduct } from "../schema";

export class ProductRepository {
  async findAll() {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        image: products.image,
        category: {
          id: categories.id,
          name: categories.name,
        },
        isActive: products.isActive,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(asc(products.name));

    return result;
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return result;
  }

  async create(data: NewProduct) {
    return await db.insert(products).values(data).returning();
  }

  async update(id: string, data: Partial<NewProduct>) {
    const [result] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return result;
  }

  async toggle(id: string) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!product) return;

    const [result] = await db
      .update(products)
      .set({ isActive: !product?.isActive, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    return result;
  }
}
