import { db, eq } from "@repo/db";
import { users } from "@repo/db/schema";
import { selectUserSchema, UserInput } from "@repo/utils/validation/user";
import { hash } from "bcrypt";
import { AppError } from "@/middlewares/error-handler";

export class UserService {
  async create(data: UserInput) {
    // Verifica se o e-mail já está cadastrado
    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    // Criptografa a senha
    const hashedPassword = await hash(data.password, 8);

    // Salva no banco de dados substituindo a senha original pelo hash
    const [newUser] = await db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();

    if (!newUser) {
      throw new AppError("Não foi possível criar o usuário.", 500);
    }

    return selectUserSchema.parse(newUser);
  }

  async list() {
    return await db.select().from(users);
  }

  async findById(user_id: string) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, user_id));

      if (!user) throw new AppError("Usuário não encontrado", 404);

      return selectUserSchema.parse(user);
    } catch (err) {
      console.log(err);
      throw new AppError("Usuário não encontrado", 404);
    }
  }
}
