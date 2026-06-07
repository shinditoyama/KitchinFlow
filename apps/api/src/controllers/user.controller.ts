import { Request, Response } from "express";
import { UserService } from "@/services/user.service";

export class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  signup = async (req: Request, res: Response) => {
    const newUser = await this.service.register(req.body);
    res.status(201).json(newUser);
  };

  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const session = await this.service.login({ email, password });
    res.status(200).json(session);
  };

  getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAllUsers();
    res.status(200).json(data);
  };

  getById = async (req: Request, res: Response) => {
    const user_id = req.user_id;
    const data = await this.service.getUserById(user_id);
    res.status(200).json(data);
  };
}
