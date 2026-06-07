import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { HttpException } from "./error-handler";

interface Payload {
  sub: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) throw new Error("Token não fornecido");

  const [_, token] = authToken.split(" ");

  try {
    const { sub } = verify(token!, process.env.JWT_SECRET!) as Payload;
    req.user_id = sub;
    next();
  } catch (error) {
    throw new HttpException(401, "Token inválido");
  }
}
