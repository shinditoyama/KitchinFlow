import { eq } from "drizzle-orm";
import { db } from "../config";
import { users, NewUser } from "../schema";

export class UserRepository {
  async findAll() {
    return await db.select().from(users);
  }

  async findById(id: string) {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async findByEmail(email: string) {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result;
  }

  async register(data: NewUser, hashedPassword: string) {
    const [newUser] = await db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();
    return newUser;
  }
}
