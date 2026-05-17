import { Request, Response } from "express";
import { UserService } from "@/services/user.service";

const user = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const newUser = await user.create(req.body);
    res.status(201).json(newUser);
  }

  async getAll(_: Request, res: Response) {
    const data = await user.list();
    res.status(200).json(data);
  }

  async getOne(req: Request, res: Response) {
    const user_id = req.user_id;
    const data = await user.findById(user_id);
    res.status(200).json(data);
  }
}
