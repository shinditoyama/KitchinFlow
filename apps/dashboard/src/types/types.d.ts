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
