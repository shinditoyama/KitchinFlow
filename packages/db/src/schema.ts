import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// 1. Nova Tabela de Categorias
export const categorias = pgTable("categorias", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(), // Ex: "Entradas", "Bebidas"
  slug: text("slug").notNull().unique(), // Ex: "entradas", "bebidas"
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
