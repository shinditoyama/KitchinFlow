import { products } from "@repo/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertProductSchema = createInsertSchema(products, {
  name: () => z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  description: () => z.string().max(255, "Descrição muito longa").optional(),
  price: () =>
    z
      .number("O preço deve ser um número válido")
      .positive("O preço deve ser maior que zero"),
  categoryId: () => z.uuid("ID de categoria inválido"),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const selectProductSchema = createSelectSchema(products);

// Tipo exportado para o React Hook Form
export type ProductFormValues = z.infer<typeof insertProductSchema>;

export type ProductResponse = z.infer<typeof selectProductSchema>;
