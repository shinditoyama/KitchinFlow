import { Request, Response, NextFunction } from "express";
import { ZodType } from "@repo/utils";

export const validate =
  (schema: ZodType) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
