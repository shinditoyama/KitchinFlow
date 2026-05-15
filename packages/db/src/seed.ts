import "dotenv/config"; // IMPORTANTE: Carrega o .env antes de tudo
import { db } from "./index";
import { categories, products } from "./schema";

async function main() {
  console.log("🌱 Iniciando o seeding...");

  try {
    // 1. Limpar tabelas (opcional, cuidado em produção!)
    await db.delete(categories);
    await db.delete(products);

    // 2. Inserir Categoria
    const catList = await db
      .insert(categories)
      .values([{ name: "Entradas" }, { name: "Principais" }])
      .returning();

    const [catEntradas, catPrincipais] = catList;

    await db.insert(products).values([
      {
        name: "Bruschetta",
        description: "Pão italiano com tomate, manjericão e azeite",
        price: 24.9,
        categoryId: catEntradas?.id,
        image:
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300",
      },
      {
        name: "Carpaccio",
        description: "Fatias finas de filé com rúcula e parmesão",
        price: 39.9,
        categoryId: catEntradas?.id,
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300",
      },
      {
        name: "Picanha na Brasa",
        description: "Picanha grelhada com arroz e feijoada",
        price: 69.9,
        categoryId: catPrincipais?.id,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=300",
      },
    ]);

    console.log("✅ Produtos inseridos.");
    console.log("✅ Seeding finalizado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    process.exit(1);
  }
}

main();
