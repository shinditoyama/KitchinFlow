interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ICategory {
  id: string;
  name: string;
  count: number;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isActive: boolean;
  categoryId: string;
  category: ICategory;
}

interface IOrder {
  id: string;
  table: string;
  draft: boolean;
  status: string;
  items: [IOrderItem];
  createdAt: Date;
}

interface IOrderItem {
  id: string;
  amount: number;
  product: IProduct;
}

interface IMesa {
  id: string;
  number: number;
  capacity: number;
  status: "disponivel" | "ocupada" | "reservada";
  //posX: number;
  //posY: number;
}
