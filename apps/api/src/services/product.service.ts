import { ProductRepository } from "@repo/db";
import { InsertProduct } from "@repo/utils/validation/product";
import { HttpException } from "@/middlewares/error-handler";

export class ProductService {
  private repository: ProductRepository;
  constructor() {
    this.repository = new ProductRepository();
  }

  async getAllProducts() {
    return await this.repository.findAll();
  }

  async getProductById(id: string) {
    const result = await this.repository.findById(id);
    if (!result) throw new HttpException(404, "Produto não encontrada");

    return result;
  }

  async createProduct(data: InsertProduct) {
    return await this.repository.create(data);
  }

  async updateProduct(id: string, data: Partial<InsertProduct>) {
    const result = await this.repository.update(id, data);
    if (!result) throw new HttpException(404, "ID do produto não encontrada");

    return result;
  }

  async deleteProduct(id: string) {
    const result = await this.repository.delete(id);
    if (!result) throw new HttpException(404, "ID do produto não encontrada");

    return result;
  }

  async toggleProduct(id: string) {
    const result = await this.repository.toggle(id);
    return result;
  }
}
