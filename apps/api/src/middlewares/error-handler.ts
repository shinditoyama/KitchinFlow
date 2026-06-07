import { Request, Response, NextFunction } from "express";
import { ZodError } from "@repo/utils";

export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    // Object.setPrototypeOf(this, HttpException.prototype);
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

  if (err instanceof HttpException) {
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
