import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "@repo/db/schema";

export const insertAuthSchema = z.object({
  email: z.email().min(6),
  password: z.string().min(6),
});

export const insertUserSchema = createInsertSchema(users, {
  email: () => z.email().min(1, "O e-mail é obrigatório"),
  password: () => z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
}).omit({ id: true });

export const selectUserSchema = createSelectSchema(users).omit({
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;

/*
 .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message:
        "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
    }),
*/
