import { AppError } from "@/middlewares/error-handler";
import { db, eq } from "@repo/db";
import { products } from "@repo/db/schema";
import { ProductInput } from "@repo/utils/validation/product";

export class ProductService {
  async create(data: ProductInput) {
    return await db.insert(products).values(data).returning();
  }

  async list() {
    return await db.select().from(products);
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!result) throw new AppError("Produto não encontrada", 404);

    return result;
  }

  async update(id: string, data: Partial<ProductInput>) {
    const [result] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();

    if (!result)
      throw new AppError(
        "Não foi possível atualizar: produto não encontrada",
        404,
      );

    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!result)
      throw new AppError(
        "Não foi possível excluir: produto não encontrada",
        404,
      );

    return result;
  }
}
