import { OrderRepository } from "@repo/db";
import { InsertOrder, InsertOrderItem } from "@repo/utils/validation/order";
import { HttpException } from "@/middlewares/error-handler";

export class OrderService {
  private repository: OrderRepository;
  constructor() {
    this.repository = new OrderRepository();
  }

  async getAllOreders() {
    return await this.repository.findAll();
  }

  async getOrderById(id: string) {
    const result = await this.repository.findById(id);
    if (!result) throw new HttpException(404, "Pedido não encontrada");

    return result;
  }

  async createOrder(data: InsertOrder) {
    return await this.repository.create(data);
  }

  async deleteOrder(id: string) {
    const result = await this.repository.delete(id);
    if (!result) throw new HttpException(404, "ID do pedido não encontrada");

    return result;
  }

  async sendOrder(id: string) {
    return await this.repository.sendOrder(id);
  }

  async addItem(data: InsertOrderItem) {
    return await this.repository.addItem(data);
  }

  async removeItem(id: string) {
    return await this.repository.removeItem(id);
  }
}
