import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "@repo/db/schema";

export const insertProductSchema = createInsertSchema(products, {
  name: () => z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  description: () => z.string().max(255, "Descrição muito longa").optional(),
  price: () =>
    z
      .number("O preço deve ser um número válido")
      .positive("O preço deve ser maior que zero"),
  categoryId: () => z.uuid("ID de categoria inválido"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateProductSchema = insertProductSchema.partial();

export const selectProductSchema = createSelectSchema(products);

// Inferindo tipos TS a partir dos schemas
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type SelectProduct = z.infer<typeof selectProductSchema>;
