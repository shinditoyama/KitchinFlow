import { Router } from "express";
import categoyRoutes from "./category.routes";
import orderRoutes from "./order.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";

const router: Router = Router();

// Rotas Principais
router.use("/categories", categoyRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
