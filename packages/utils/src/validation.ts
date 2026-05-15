import { z } from "zod";

/*
export const categorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(30, "O nome deve ter no máximo 30 caracteres"),
  }),
});

export type CategoryInput = z.infer<typeof categorySchema>["body"];
*/

export const categorySchema = z.object({
  name: z
    .string("O nome da categoria deve ser uma string")
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(30, "O nome deve ter no máximo 30 caracteres"),
});

export type CategoryInput = z.infer<typeof categorySchema>;

/////////////////////////////////////////////////////////////////////////

export const productSchema = z.object({
  name: z
    .string("O nome do produto deve ser uma string")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(30, "O nome deve ter no máximo 30 caracteres"),
  description: z.string().max(255, "Descrição muito longa").optional(),
  price: z
    .number("O preço é obrigatório")
    .positive("O preço deve ser maior que zero"),
  categoryId: z.uuid("ID de categoria inválido"),
  image: z.url("URL da imagem inválida"),
  isActive: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
