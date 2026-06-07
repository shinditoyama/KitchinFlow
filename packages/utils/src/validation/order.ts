import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { orderItems, orders } from "@repo/db/schema";

export const insertOrderSchema = createInsertSchema(orders);
export const selectOrderSchema = createSelectSchema(orders);

// Inferindo tipos TS a partir dos schemas
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type SelectOrder = z.infer<typeof selectOrderSchema>;

// -------------------------------------------------------------------

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  amount: () => z.number().int().positive(),
  orderId: () => z.uuid("ID do pedido inválido"),
  productId: () => z.uuid("ID do produto inválido"),
});

export const selectOrderItemSchema = createSelectSchema(orderItems);

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type SelectOrderItem = z.infer<typeof selectOrderItemSchema>;
