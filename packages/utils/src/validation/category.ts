import { categories } from "@repo/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertCategorySchema = createInsertSchema(categories, {
  name: () => z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export const selectCategorySchema = createSelectSchema(categories);

// Tipo exportado para o React Hook Form
export type CategoryFormValues = z.infer<typeof insertCategorySchema>;

export type CategoryResponse = z.infer<typeof selectCategorySchema>;
