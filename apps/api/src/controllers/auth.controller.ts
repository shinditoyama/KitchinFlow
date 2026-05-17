import { Request, Response } from "express";
import { AuthService } from "@/services/auth.service";

const auth = new AuthService();

export class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const session = await auth.login({ email, password });

    res.status(200).json(session);
  }
}
