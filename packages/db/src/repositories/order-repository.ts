import { asc, desc, eq } from "drizzle-orm";
import { db } from "../config";
import {
  NewOrder,
  NewOrderItem,
  orderItems,
  orders,
  products,
} from "../schema";

export class OrderRepository {
  async findAll() {
    const result = await db.query.orders.findMany({
      where: eq(orders.draft, true),
      with: {
        items: {
          columns: {
            id: true,
            amount: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: desc(orders.createdAt),
    });

    return result;
  }

  async findById(id: string) {
    const [result] = await db.query.orders.findMany({
      where: eq(orders.id, id),
      with: {
        items: {
          columns: {
            id: true,
            amount: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return result;
  }

  async create(data: NewOrder) {
    const [result] = await db.insert(orders).values(data).returning();
    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning();

    return result;
  }

  async addItem(data: NewOrderItem) {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, data.orderId));

    if (!order) return;

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, data.productId));

    if (!product) return;

    return await db
      .insert(orderItems)
      .values({
        amount: Number(data.amount),
        orderId: data.orderId,
        productId: data.productId,
      })
      .returning();
  }

  async removeItem(id: string) {
    const [item] = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.id, id));

    if (!item) return;

    const [result] = await db
      .delete(orderItems)
      .where(eq(orderItems.id, id))
      .returning();

    return result;
  }

  async sendOrder(id: string) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));

    if (!order) return;

    const [result] = await db
      .update(orders)
      .set({ draft: false, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return result;
  }
}
