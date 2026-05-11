import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: "../../.env" });

const connectionString = process.env.DATABASE_URL;

// Verifica se a URL existe para evitar erros silenciosos
if (!connectionString) {
  throw new Error("DATABASE_URL não encontrada no arquivo .env");
}

// Cliente para queries (Query Client)
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
// export * from "./schema";
