"use server";

import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // 1. Faz a requisição para a sua API Express
    const response = await apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // 2. Salva o JWT retornado pela API Express nos Cookies do Next.js
    setToken(response.token);
  } catch (error: any) {
    // Retorna o erro capturado pelo seu errorHandler do Express
    return { error: error.message || "Credenciais inválidas." };
  }

  // 3. Redireciona o usuário para o dashboard após o login com sucesso
  // (O redirect deve ficar FORA do bloco try/catch por conta do funcionamento interno do Next.js)
  redirect("/");
}

/*export async function register(
  prevState: { success: boolean; error: string } | null,
  formData: FormData,
) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      name: name,
      email: email,
      password: password,
    };

    await apiFetch("/api/user/session", {
      method: "POST",
      body: JSON.stringify(data),
    });

    redirect("/login");
  } catch (error) {
    if (error instanceof Error) return { success: false, error: error.message };

    return { success: false, error: "Erro ao criar conta" };
  }
}*/
