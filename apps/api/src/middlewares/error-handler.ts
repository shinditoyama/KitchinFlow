import { Request, Response, NextFunction } from "express";
import { ZodError } from "@repo/utils";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Erros de Validação (Zod)
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "Error",
      message: "Falha na validação dos dados.",
      details: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Erros de Regra de Negócio (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.name,
      message: err.message,
    });
  }

  // Erros Desconhecidos (Fallback)
  console.error("❌ INTERNAL SERVER ERROR:", err);

  return res.status(500).json({
    status: err.name,
    message: err.message,
  });
}
