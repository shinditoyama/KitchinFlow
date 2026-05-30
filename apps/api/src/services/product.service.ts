import { AppError } from "@/middlewares/error-handler";
import { asc, db, eq } from "@repo/db";
import { products } from "@repo/db/schema";
import { ProductFormValues } from "@repo/utils/validation/product";

export class ProductService {
  async create(data: ProductFormValues) {
    return await db.insert(products).values(data).returning();
  }

  async list() {
    const result = await db.query.products.findMany({
      with: {
        category: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [asc(products.name)],
    });

    return result;
  }

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!result) throw new AppError("Produto não encontrada", 404);

    return result;
  }

  async update(id: string, data: Partial<ProductFormValues>) {
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

  async toggleActive(id: string, isActive: boolean) {
    const [result] = await db
      .update(products)
      .set({ isActive })
      .where(eq(products.id, id))
      .returning();

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
