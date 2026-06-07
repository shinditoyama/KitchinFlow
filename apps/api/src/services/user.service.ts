import { UserRepository } from "@repo/db";
import { selectUserSchema, InsertUser } from "@repo/utils/validation/user";
import { HttpException } from "@/middlewares/error-handler";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface AuthInputProps {
  email: string;
  password: string;
}

export class UserService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers() {
    return await this.repository.findAll();
  }

  async getUserById(id: string) {
    const result = await this.repository.findById(id);
    if (!result) throw new HttpException(404, "Usuário não encontrado");

    return selectUserSchema.parse(result);
  }

  async register(data: InsertUser) {
    // Verifica se o e-mail já está cadastrado
    const userExists = await this.repository.findByEmail(data.email);
    if (!userExists)
      throw new HttpException(409, "Este e-mail já está em uso.");

    // Criptografa a senha
    const hashedPassword = await hash(data.password, 8);

    // Salva no banco de dados substituindo a senha original pelo hash
    const newUser = await this.repository.register(data, hashedPassword);
    if (!newUser)
      throw new HttpException(500, "Não foi possível criar o usuário.");

    return selectUserSchema.parse(newUser);
  }

  async login({ email, password }: AuthInputProps) {
    const user = await this.repository.findByEmail(email);
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

/*export class UserService {
  async create(data: UserInput) {
    // Verifica se o e-mail já está cadastrado
    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (userExists) {
      throw new HttpException(409, "Este e-mail já está em uso.");
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
      throw new HttpException(500, "Não foi possível criar o usuário.");
    }

    return selectUserSchema.parse(newUser);
  }

  async list() {
    return await db.select().from(users);
  }

  async findById(user_id: string) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, user_id));

      if (!user) throw new HttpException(404, "Usuário não encontrado");

      return selectUserSchema.parse(user);
    } catch (err) {
      console.log(err);
      throw new HttpException(404, "Usuário não encontrado");
    }
  }
}*/
