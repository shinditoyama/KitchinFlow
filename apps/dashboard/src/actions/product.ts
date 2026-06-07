"use server";

import { apiFetch } from "@/lib/api";
import {
  InsertProduct,
  insertProductSchema,
  UpdateProduct,
} from "@repo/utils/validation/product";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return await apiFetch<IProduct[]>("/api/products");
}

export async function createProduct(data: InsertProduct) {
  const validatedFields = insertProductSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "Dados inválidos enviados para o servidor.",
    };
  }

  try {
    await apiFetch<IProduct>("/api/products", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/product");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao criar produto." };
  }
}

export async function updateProduct(id: string, data: UpdateProduct) {
  const validatedFields = insertProductSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "Dados inválidos enviados para o servidor.",
    };
  }

  try {
    await apiFetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/product");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao atualizar produto." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await apiFetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    revalidatePath("/product");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao excluir." };
  }
}

export async function toggleProduct(id: string) {
  try {
    await apiFetch(`/api/products/${id}/status`, {
      method: "PATCH",
    });

    revalidatePath("/product");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, message: "Erro ao excluir." };
  }
}
