import { UserRepository } from "@repo/db";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "./error-handler";

const repository = new UserRepository();

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user_id = req.user_id;

  if (!user_id) throw new HttpException(401, "Usuário sem permissão");

  // const [user] = await db.select().from(users).where(eq(users.id, user_id));
  const user = await repository.findById(user_id);

  if (!user || user.role !== "admin")
    throw new HttpException(401, "Usuário sem permissão");

  next();
};
