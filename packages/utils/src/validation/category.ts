import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { categories } from "@repo/db/schema";

export const insertCategorySchema = createInsertSchema(categories, {
  name: () => z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateCategorySchema = insertCategorySchema.partial();

export const selectCategorySchema = createSelectSchema(categories);

// Tipos inferindos
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type SelectCategory = z.infer<typeof selectCategorySchema>;
