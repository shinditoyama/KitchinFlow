"use server";

import { apiFetch } from "@/lib/api";
import {
  CategoryFormValues,
  insertCategorySchema,
} from "@repo/utils/validation/category";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return await apiFetch<ICategory[]>("/api/categories");
}

export async function createCategory(data: CategoryFormValues) {
  const validatedFields = insertCategorySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "Dados inválidos enviados para o servidor.",
    };
  }

  try {
    await apiFetch<ICategory>("/api/categories", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/category");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao criar categoria." };
  }
}

export async function updateCategory(id: string, data: CategoryFormValues) {
  const validatedFields = insertCategorySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "Dados inválidos enviados para o servidor.",
    };
  }

  try {
    await apiFetch(`/api/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/category");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao atualizar categoria." };
  }
}

export async function deleteCategory(id: string) {
  try {
    await apiFetch(`/api/categories?id=${id}`, {
      method: "DELETE",
    });

    revalidatePath("/category");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao excluir." };
  }
}

/*export const categoryService = {
  async list(): Promise<ICategory[]> {
    return apiFetch<ICategory[]>("/categories", {
      method: "GET",
    });
  },

  async create(name: string, token?: string): Promise<ICategory> {
    return apiFetch<ICategory>("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      token,
    });
  },
};*/
