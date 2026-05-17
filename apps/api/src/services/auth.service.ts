import { db, eq } from "@repo/db";
import { users } from "@repo/db/schema";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface AuthInputProps {
  email: string;
  password: string;
}

export class AuthService {
  async login({ email, password }: AuthInputProps) {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) throw new Error("Email/Senha é obrigatório");

    // Verificar se a senha está correta
    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) throw new Error("Senha inválida");

    // Gerar token jwt
    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { subject: user.id, expiresIn: "30d" },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  }
}
