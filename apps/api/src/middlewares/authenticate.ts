import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "./error-handler";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) throw new Error("Token não fornecido");

  const [_, token] = authToken.split(" ");

  try {
    const { sub } = verify(token!, process.env.JWT_SECRET!) as Payload;
    req.user_id = sub;
    next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }
}
