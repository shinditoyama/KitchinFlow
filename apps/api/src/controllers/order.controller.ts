import { Request, Response } from "express";
import { OrderService } from "@/services/order.service";

export class OrderController {
  private service: OrderService;
  constructor() {
    this.service = new OrderService();
  }

  getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAllOreders();
    res.status(200).json(data);
  };

  getById = async (req: Request, res: Response) => {
    const id = req.query.id;
    const data = await this.service.getOrderById(String(id));
    res.status(200).json(data);
  };

  create = async (req: Request, res: Response) => {
    const newOrder = await this.service.createOrder(req.body);
    res.status(201).json(newOrder);
  };

  delete = async (req: Request, res: Response) => {
    const id = req.query.id;
    await this.service.deleteOrder(String(id));
    res.status(204).send();
  };

  sendOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.sendOrder(String(id));
    res.status(200).json(data);
  };

  addItem = async (req: Request, res: Response) => {
    const newOrderItem = await this.service.addItem(req.body);
    res.status(201).json(newOrderItem);
  };

  removeItem = async (req: Request, res: Response) => {
    const id = req.query.id;
    await this.service.removeItem(String(id));
    res.status(204).send();
  };
}
