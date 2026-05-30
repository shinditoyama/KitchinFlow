interface FerchOption extends RequestInit {
  token?: string;
  /*cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };*/
}

export async function apiFetch<T>(
  endpoint: string,
  options: FerchOption = {},
): Promise<T | null> {
  const { token, headers, ...restOptions } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Se um token for passado manualmente (vindo de cookies no Server Component)
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro na requisição: ${response.status}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}
