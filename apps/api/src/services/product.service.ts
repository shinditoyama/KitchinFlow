import { db } from "@repo/db";
import { products } from "@repo/db/schema";
import { ProductInput } from "@repo/utils/validation";

export class ProductService {
  async create(data: ProductInput) {
    return await db.insert(products).values(data).returning();
  }

  async listAll() {
    return await db.select().from(products);
  }
}
