import { Router } from "express";
import authRoutes from "./auth.routes";
import categoyRoutes from "./category.routes";
import productRoutes from "./product.routes";
import uploadRoutes from "./upload.routes";
import userRoutes from "./user.routes";

const router: Router = Router();

// Rotas Principais
router.use("/auth", authRoutes);
router.use("/categories", categoyRoutes);
router.use("/products", productRoutes);
// router.use("/uploadthing", uploadRoutes);
router.use("/users", userRoutes);

export default router;
