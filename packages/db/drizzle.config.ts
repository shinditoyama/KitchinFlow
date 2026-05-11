import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../../.env" });

// Verifica se a URL existe para evitar erros silenciosos
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não encontrada no arquivo .env");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
