import { db, eq } from "@repo/db";
import { users } from "@repo/db/schema";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./error-handler";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user_id = req.user_id;

  if (!user_id) throw new AppError("Usuário sem permissão", 401);

  const [user] = await db.select().from(users).where(eq(users.id, user_id));

  if (!user || user.role !== "admin")
    throw new AppError("Usuário sem permissão", 401);

  next();
};
