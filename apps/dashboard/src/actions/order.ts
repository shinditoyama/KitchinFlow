"use server";

import { apiFetch } from "@/lib/api";
import {
  InsertCategory,
  insertCategorySchema,
} from "@repo/utils/validation/category";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  return await apiFetch<IOrder[]>("/api/orders");
}
